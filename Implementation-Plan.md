# Requirements
You are to implement a program that would transfer documents between 2 projects of the organization **Majestic Builders** by interacting with its [web-apis].
Along with integration tests that prove successful transfers.

More details: **BRIEF.md**

**Useful links:**
- https://help.aconex.com/en/aconex/our-main-application/using-aconex/working-with-documents/basic-tasks-in-documents
- https://help.aconex.com/en/aconex/aconex-apis/api-documentation
- https://help.aconex.com/en/DisplayContent/1481789115642-sample-web-requests---java
- https://help.aconex.com/api-developer-guide/document


## Implementation details
======================

## Prerequisites:
- Get API access (username/password or oAuth)
- Get API hostname
- Get api access to the projects


## Feature1: Upload documents(s)

- API details for Upload/Register documents: https://help.aconex.com/api-developer-guide/document#api_guide_CORE70FA4FF868734352BCA8F8936BBC3D21
- Sample code (in Java): https://help.aconex.com/en/DisplayContent/1481789115642-sample-web-requests---java
- Project Id, in which the document would be uploaded, need to be passed as parameter rather than defined in the code
- We need to validate if that project has api access enabled, otherwise throw error
- File can be attached to the `register document` request, and based on the size of the file we can opt for Small File Upload or Large File Upload
- Document Numbers must be unique, or we can use UUID. We need to connect with client/business to validate this approach.
- Make sure mandatory fields (regardless of project configuration) and mandatory fields (based on project configuration) are passed to the api request
- Make sure the solution supports multi-version documents. **Version** is a system-generated number that increases consecutively each time a document is updated, more details: https://help.aconex.com/en/DisplayContent/how-do-version-control-and-the-aconex-audit-trail-work
- Display proper response with error details. In case of multiple documents upload in one request, we should display success/error responses for each document
- Unit and Integration tests need to be created for this feature
- Sample implementation in Typescript is provided in `solution` folder

## Feature2: List documents(s)

- API details for List/Search documents: https://help.aconex.com/api-developer-guide/document#api_guide_CORE1A2F6945869E441A8FD1B05A6982FFE6
- Sample code (in Java): https://help.aconex.com/en/DisplayContent/1481789115642-sample-web-requests---java
- We should be able to List / Search documents in project
- Project Id, in which the documents would need to be listed / searched, need to be passed as parameter rather than defined in the code
- List documents API support providing `search_query` as a parameter, we can use this to search for documents
- We can also provide fields that we need in response in `return_fields` parameter
- We can also specify `search_type`, it is recommended to use PAGED
- Unit and Integration tests need to be created for this feature
- Sample implementation in Typescript is provided in `solution` folder

## Feature3: Transfer documents(s)

- We could not find the API to transfer documents from one project to another
- There is API to download documents: https://help.aconex.com/api-developer-guide/document#api_guide_CORE275857A88A7F4B5D9CCAAA3056C9ED52
- One option is to Download document and then upload with same Document Number / Document Id, but we are not sure if this is the correct implementation
- It is advised to do a Spike around this. This might involve reaching out to Aconex team to get clarity on this.
- Eventually this feature should work in a way that we can supply `From Project Id`, `Document Id`, and `To Project Id`, and it should transfer documents over.
- We can learn more about Transfer feature here: https://help.aconex.com/en/DisplayContent/transmit-your-document
- Unit and Integration tests need to be created for this feature. The tests should cover validating that documents are moved over to other project.
- We can use `View Document Metadata1` API, to get details of the document, in which we can get Transmittal information using this tag: `<ReviewSource></ReviewSource>`
- Sample implementation in Typescript for download documents is provided in `solution` folder

