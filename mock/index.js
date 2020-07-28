/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:52:00
 * @LastEditTime: 2020-07-28 14:56:14
 * @FilePath: /koala_background_system/mock/index.js
 */

export const delay = cb => setTimeout(cb, 2000);

export const responseData = data => ({
  code: 0,
  data,
  message: '成功',
});

const categoriesIconUrl =
  'https://wx.qlogo.cn/mmopen/vi_32/7icYslR11jBbaGjm6LAXib6VRxEuibQiagia2LicNPJEgbTacD2SH8dSauGD6Cp9ggicA1tmY3foDwL5NibwZv6F1SI7Vg/132';

export default {
  'POST /api/backend-user/login': (req, res) => {
    delay(() =>
      res.json(
        responseData({
          username: '123123123',
          token: '111wwsss',
          auth: 'ADMIN',
        }),
      ),
    );
  },
  'POST /api/backend-user/change-password': (req, res) => {
    delay(() => res.json(responseData(null)));
  },
  'POST /api/backend-user/add-user': (req, res) => {
    delay(() => res.json(responseData(null)));
  },
  'POST /api/backend-user/find-user-list': (req, res) => {
    delay(() =>
      res.json(
        responseData({
          total: req.body.number * 5,
          list: [...Array(req.body.number).keys()].map(key => ({
            userId: `${key}_${req.body.page}`,
            userType: 999,
            username: `name_${key}_${req.body.page}`,
            password: '12312312312',
            createTime: new Date(),
            updateTime: new Date(),
          })),
        }),
      ),
    );
  },

  'POST /api/backend-user/update-admin-user': (req, res) => {
    delay(() => res.json(responseData(null)));
  },

  'POST /api/backend-user/delete-admin-user': (req, res) => {
    delay(() => res.json(responseData(null)));
  },
  'POST /api/backend-categories/get-categories': (req, res) => {
    delay(() =>
      res.json(
        responseData({
          total: 2,
          list: [
            {
              id: 1,
              categoriesName: '标签_1',
              categoriesIconUrl,
              isShowOnHome: false,
              isUse: true,
              createTime: new Date(),
              updateTime: new Date(),
            },
            {
              id: 2,
              categoriesName: '标签_2',
              categoriesIconUrl,
              isShowOnHome: true,
              isUse: false,
              createTime: new Date(),
              updateTime: new Date(),
            },
          ],
        }),
      ),
    );
  },
  'POST /api/backend-categories/update-categories': (req, res) => {
    delay(() => res.json(responseData(null)));
  },

  'GET /api/backend-categories/get-using-categories': (req, res) => {
    delay(() =>
      res.json(
        responseData({
          list: [
            {
              id: 14,
              categoriesName: '12312323',
              categoriesIconUrl:
                'http://localhost:8080/1594624934177_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-13T07:22:14.183Z',
              updateTime: '2020-07-13T07:22:14.183Z',
            },
            {
              id: 13,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202271542_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:51.544Z',
              updateTime: '2020-07-08T09:57:51.544Z',
            },
            {
              id: 12,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202271051_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:51.052Z',
              updateTime: '2020-07-08T09:57:51.052Z',
            },
            {
              id: 11,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202270616_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:50.617Z',
              updateTime: '2020-07-08T09:57:50.617Z',
            },
            {
              id: 10,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202270181_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:50.182Z',
              updateTime: '2020-07-08T09:57:50.182Z',
            },
            {
              id: 9,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202269758_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:49.759Z',
              updateTime: '2020-07-08T09:57:49.759Z',
            },
            {
              id: 8,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202269309_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:49.310Z',
              updateTime: '2020-07-08T09:57:49.310Z',
            },
            {
              id: 7,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202268886_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:48.886Z',
              updateTime: '2020-07-08T09:57:48.886Z',
            },
            {
              id: 6,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202268353_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:48.355Z',
              updateTime: '2020-07-08T09:57:48.355Z',
            },
            {
              id: 5,
              categoriesName: 'test',
              categoriesIconUrl:
                'http://localhost:8080/1594202267677_WechatIMG327.jpeg',
              isShowOnHome: false,
              isUse: true,
              createTime: '2020-07-08T09:57:47.678Z',
              updateTime: '2020-07-08T09:57:47.678Z',
            },
          ],
        }),
      ),
    );
  },

  'POST /api/backend-categories/add-categories': (req, res) => {
    delay(() => res.json(responseData(null)));
  },

  'POST /api/backend-applet-user/get-applet-user-list': (req, res) => {
    delay(() =>
      res.json(
        responseData({
          total: 50,
          list: [
            {
              userId: 1,
              nickName: 'always。',
              avatarUrl:
                'https://wx.qlogo.cn/mmopen/vi_32/7icYslR11jBbaGjm6LAXib6VRxEuibQiagia2LicNPJEgbTacD2SH8dSauGD6Cp9ggicA1tmY3foDwL5NibwZv6F1SI7Vg/132',
              gender: 1,
              country: 'China',
              province: 'Shanghai',
              city: 'Pudong New District',
              createTime: '2020-06-23T09:53:29.941Z',
              updateTime: '2020-06-29T06:59:08.000Z',
            },
          ],
        }),
      ),
    );
  },
  'POST /api/product-list/get-product-list': (req, res) => {
    delay(() =>
      res.json(
        responseData({
          list: [
            {
              productId: '3e478f94-20c1-42f0-9815-9992d85ebb9a',
              username: 'tanghaojie',
              categoriesName: '苹果',
              productAmount: 599900,
              productBrief: '苹果出品',
              createTime: '2020-07-23T06:58:27.648Z',
              updateTime: '2020-07-23T06:58:27.648Z',
            },
          ],
          total: 1,
        }),
      ),
    );
  },
};
