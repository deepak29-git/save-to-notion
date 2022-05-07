# useNotion
- useNotion hook gives save2Notion function which require a data object  and loading  variable  and uses useAxios hook to do api calls.

- save2Notion function requies data object which is having three properties

```
data:{
    type: [[image || text]],
    data: [[url || text]],
    title: [[page_title]]
}
```

-loading variable is an boolean variable, which tells when loading data or request made is done. It's default is true means loading and when done is false.

## Features
1. Image2Notion [Done]
2. Text2Notion    [Done]
3. Tweet2Notion [Yet to start]
4. Tweets2Notion [Yet to start]
5. Login with Notion [Yet to start]

## Requirements
- It needs two environement variables REACT_APP_NOTION_SECRET and .REACT_APP_NOTION_DATABASE_ID

## CORS
- To bypass middelware is required and for it package **http-proxy-middleware** is used, for production we have to remove this file.
- This solution is for development and testing only.

## How to use useNotion hook
- Import the hook and pass the data object
- Listen for loading state to be set to false 
- To see changes lookover notion database