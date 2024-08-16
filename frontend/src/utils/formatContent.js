// src/utils/formatContent.js
export const formatContent = (content) => {
    // Replace **bold** with <b>bold</b>
    let formattedContent = content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Replace **Section Title** with <h2>Section Title</h2>
    formattedContent = formattedContent.replace(/\*\*(.*?)\*\*/g, '<h2>$1</h2>');

    // Replace * Bullet points with <li>Bullet points</li> and add <ul> tags
    formattedContent = formattedContent
        .replace(/^\* (.*)$/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n*)+/g, '<ul>$&</ul>');

    // Replace new lines with <br> tags for HTML rendering
    formattedContent = formattedContent.replace(/\n/g, '<br>');

    return formattedContent;
};
