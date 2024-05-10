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

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}