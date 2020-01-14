export default class Card {
    cardInfo = {}

    do(cardInfo) {
        return {
            background: cardInfo.bg,
            height: "823rpx",
            width:"690rpx",
            views:[{
                    type: "image",
                    url: cardInfo.mini_code,
                    css:{
                        background: "#fff",
                        top: "263rpx",
                        height:"350rpx",
                        width:"350rpx",
                        left: "170rpx",
                        shadow: '0rpx 10rpx 20rpx #FBD3BC',
                        borderColor:'#EEEEEE',
                        borderWidth:'1rpx'
                    },
                },
                {
                text: cardInfo.name,
                type: "text",
                css:{
                    color: "#333",
                    top:"95rpx",
                    fontSize: "40rpx",
                    left: "100rpx",
                    maxLines: 1,
                },
                }
            ],
                authorization: false,
            }
    }

    TEXT_SMALL = {
        fontSize: '48rpx'
    }
}
