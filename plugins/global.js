const global = {
    currency: {
        prefix: 'Tk ',
        suffix: ' Taka',
    },
    siteurl: 'http://wedevs.job',
    apiurl: 'http://wedevs.job',
    adminapiurl: 'http://wedevs.job/admin',
}
  
export default ({ app }, inject) => {
    inject('global', global)
}