// reduce() - reduce an array to a single value. 
// It executes a provided function for each value of the array (from left-to-right) 
// and the return value of the function is stored in an accumulator (result/total)

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog
    }

    return blogs.length === 0
        ? 0
        : blogs.map(blog => blog.likes).reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    const reducer = (max, blog) => {
        return blog.likes > max.likes 
            ? blog 
            : max
    }

    return blogs.length === 0
        ? null
        : blogs.reduce(reducer, { likes: -1 })
}


// 4.7*: Helper Functions and Unit Tests, step 5
// find the author who has written the most blogs from a given list of blogs. 
// It takes an array of blog objects as an argument.

const mostBlogs = (blogs) => {

    if(blogs.length === 0) {
        return null
    }

    const blogsPerAuthor = {}

    blogs.forEach((blog) => {
        if(!blogsPerAuthor[blog.author]) {
            blogsPerAuthor[blog.author] = 0
        }
        blogsPerAuthor[blog.author]++
    })

    let maxBlogs = 0
    let maxAuthor = ''

    for (const author in blogsPerAuthor) {
        if(blogsPerAuthor[author] > maxBlogs) {
            maxBlogs = blogsPerAuthor[author]
            maxAuthor = author
        }
    }

    return {
        author: maxAuthor,
        blogs: maxBlogs
    }
}




const mostLikes = (blogs) => {
    if(blogs.length === 0) {
        return null
    }

    likesPerAuthor = {}

    blogs.forEach((blog) => {
        if(!likesPerAuthor[blog.author]) {
            likesPerAuthor[blog.author] = 0
        }
        likesPerAuthor[blog.author] += blog.likes
    })

    let maxAuthor = ''
    let maxLikes = 0

    for (const author in likesPerAuthor) {
        if(likesPerAuthor[author] > maxLikes) {
            maxLikes = likesPerAuthor[author]
            maxAuthor = author
        }
    }

    return {
        author: maxAuthor,
        likes: maxLikes
    }


}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}