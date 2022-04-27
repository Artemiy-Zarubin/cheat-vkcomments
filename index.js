const config = require('./config.json');
const rq = require('prequest');

let text = config.text, stickerId = config.stickerId, l=0,
	link = `https://api.vk.com/method/wall.createComment?owner_id=${config.owner_id}&post_id=${config.post_id}&v=5.83`;
if(!text || !stickerId) { console.error('Произошла ошибка, текст или айди стикера не установлен.'); process.exit(); }

setInterval(() => {
	if(config.replyToComment !== 0) link+=`&reply_to_comment=${config.replyToComment}`;
	if(config.useSticker) link+=`&sticker_id=${stickerId}`;
	else link+=`&message=${text}`;
	config.tokens.map(v => { let vlink = link+`&access_token=${v}`;
		rq(vlink).then(res => { l++;
			if(!res['response']) console.log(`[${l}] Комментарий не добавлен!`);
			else console.log(`[${l}] Комментарий добавлен!`);
		});
	});
}, config.cd);