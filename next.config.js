/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{
    domains: ['imgs.xkcd.com']
  },
  //ES MUY IMPORTANTE PARA EL SEO
  i18n:{
    locales:['en','es'],
    defaultLocale:'en',
    localeDetection:false //DEFECTO ES DEFAULT
  }
}

module.exports = nextConfig
