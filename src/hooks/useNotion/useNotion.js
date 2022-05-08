import { useAxios } from "../useAxios/useAxios";

function useNotion() {
  const { response, error, loading, requestData } = useAxios();
  const NOTION_SECRET = process.env.REACT_APP_NOTION_SECRET;
  const NOTION_DATABASE_ID = process.env.REACT_APP_NOTION_DATABASE_ID;

  function generateImageBlock(url) {
    return {
      object: "block",
      type: "image",
      image: {
        type: "external",
        external: {
          url: url,
        },
      },
    };
  }

  function generateParagraphBlock(content) {
    return {
      object: "block",
      type: "paragraph",
      paragraph: {
        rich_text: [
          {
            type: "text",
            text: {
              content: content,
            },
          },
        ],
      },
    };
  }

  function generateTweetBlock(text, media) {
    const separatedText = text.split("\n");
    const paragraphs = separatedText
      .filter((p) => p !== "")
      .map((text) => generateParagraphBlock(text));
    if (media.length === 0) {
      return [...paragraphs];
    }
    const images = media
      .filter((m) => m.type === "photo")
      .map((m) => generateImageBlock(m.url));
    return [...paragraphs, ...images];
  }

  function generatePropertiesBlock(content) {
    return {
      Name: {
        title: [
          {
            text: {
              content: content,
            },
          },
        ],
      },
    };
  }

  function getBlock(data) {
    if (data.type === "text") {
      return generateParagraphBlock(data.text);
    } else if (data.type === "image") {
      return generateImageBlock(data.url);
    }
    if (data.type === "tweet") {
      return generateTweetBlock(data.text, data.media);
    } else {
      console.error(
        `Given data.type: {${data.type}} for page content block not supported`
      );
      return;
    }
  }

  async function save2Notion(data) {
    const block = getBlock(data);
    const children = [];
    if (data.type === "tweet") {
      children.push(...block);
    } else {
      children.push(block);
    }
    const properties = Object.assign({}, generatePropertiesBlock(data.title));
    const axiosParams = {
      method: "post",
      url: "v1/pages",
      headers: {
        Accept: "application/json",
        "Notion-Version": "2022-02-22",
        "Content-Type": "application/json",
        Authorization: `Bearer ${NOTION_SECRET}`,
      },
      data: {
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
        children,
      },
    };
    await requestData(axiosParams);
  }

  return { save2Notion, loading };
}

export { useNotion };
