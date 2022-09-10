import {articleRepo} from '../lib/entities.js'
import {ServerError} from '../lib/helpers.js'

export async function getArticles(options, body) {
  let results
  // try {
    let search = articleRepo.search()
    if('tag' in options) search = search.where('tagList').contains(options.tag)
    if('author' in options) search = search.where('author').eq(options.author)
    console.log('fff')
    if('favorited' in options) search = search.where('favoritedBy').contains(options.favorited)
    results = await search.page(options.offset ?? 0, options.limit ?? 20)
  // } catch {
    // throw new ServerError({
      // error: 'Wrong Parameters'
    // })
  // }
  const articlesPromise = results.map((result) => result.article(body.id))
  const articles = await Promise.all(articlesPromise)
  return {
    data: {
      articles, 
      articlesCount: articles.length
    }
  };
}

export async function getArticlesFeed(options, body) {
  // const following = (await userRepo.fetch(body.id)).user
  // const results = await articleRepo.search().where('author')

  return {
    status: 200,
    data: 'getArticles ok!'
  };
}

export async function createArticle(requestBody) {
  const {title, description, body, tagList} = requestBody.article
  if(title || description || body) {
    throw new ServerError({
      error: 'Title, description and body of an article is required'
    })
  }
  const createdAt = new Date
  let slug = title.replace(/[^a-z0-9]/gi,'-').toLowerCase()
  const slugExists = await articleRepo.search().where('slug').eq(slug).count()

  // if(slugExists !== 0) {
  //   const dateString = createdAt.toLocaleString('en-US', {dateStyle:'short', timeZone:'UTC'})
  //   slug = slug + dateString.replaceAll('/','-')
  // }

  const author = requestBody.id
  const newArticle = await articleRepo.createAndSave({title, description, body, tagList, slug, createdAt, author, updatedAt : createdAt, favoritedBy : []})
  return {
    data: {article: await newArticle.article()}
  };
}

export async function getArticle(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getArticle ok!'
  };
}

export async function updateArticle(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'updateArticle ok!'
  };
}

export async function deleteArticle(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'deleteArticle ok!'
  };
}

export async function getArticleComments(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'getArticleComments ok!'
  };
}

export async function createArticleComment(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'createArticleComment ok!'
  };
}

export async function deleteArticleComment(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'deleteArticleComment ok!'
  };
}

export async function createArticleFavorite(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'createArticleFavorite ok!'
  };
}

export async function deleteArticleFavorite(options) {
  // Implement your business logic here...
  //
  // This function should return as follows:
  //
  // return {
  //   status: 200, // Or another success code.
  //   data: [] // Optional. You can put whatever you want here.
  // };
  //
  // If an error happens during your business logic implementation,
  // you should throw an error as follows:
  //
  // throw new ServerError({
  //   status: 500, // Or another error code.
  //   error: 'Server Error' // Or another error message.
  // });

  return {
    status: 200,
    data: 'deleteArticleFavorite ok!'
  };
}
