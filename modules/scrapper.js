const cheerio = require("cheerio")
const axios = require("axios")

exports.scrap = async (query) =>{
  const base = "https://www.matahari.com/catalogsearch/result/?q="
  try {
    const response = await axios.get(base+query);
    const html_data = response.data;
    const $ = cheerio.load(html_data);
    const result = [];

    const selectedElement = $(".item.product.product-item");
    selectedElement.each(function(){
      link = $(this).find('a.product.photo.product-item-photo.product-item-click').attr('href')
      image = $(this).find(".product-image-photo").attr('data-src')
      title = $(this).find('.product-item-link').text()
      price = $(this).find('.price-container.price-final_price.tax.weee').first().text()
      result.push({link, image, title, price})
    })
    return result.slice(0, 5);
} catch (error) {
    throw error; // Tangkap dan lemparkan error untuk menangani di controller
}
    
    
}


