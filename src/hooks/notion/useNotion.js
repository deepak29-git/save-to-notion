import { useAxios } from "hooks/axios/useAxios";

function useNotion() {
  const {
    response,
    error,
    loading,
    requestData,
  } = useAxios();
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
      return  generateParagraphBlock(data.text);
    } else if (data.type === "image") {
      return  generateImageBlock(data.url);
    } else {
      console.error(
        `Given data.type: {${data.type}} for page content block not supported`
      );
      return;
    }
  }

  async function save2Notion(data) {
    const block = getBlock(data);
    const children = [].concat([block]);
    const properties = Object.assign({}, generatePropertiesBlock(data.title));
    const axiosParams = {
      method: "post",
      url: "/v1/pages",
      headers: {
        Accept: "application/json",
        "Notion-Version": "2022-02-22",
        "Content-Type": "application/json",
        Authorization: `Bearer ${NOTION_SECRET}`,
      },
      data:{  parent: { "database_id": NOTION_DATABASE_ID}, properties, children}
    };

    await requestData(axiosParams);
  }


  return { save2Notion, loading };
}

export {useNotion};