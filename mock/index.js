/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:52:00
 * @LastEditTime: 2020-07-07 16:23:55
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
              categoriesId: 1,
              categoriesName: '标签_1',
              categoriesIconUrl,
              isShowOnHome: false,
              isUse: true,
              createTime: new Date(),
              updateTime: new Date(),
            },
            {
              categoriesId: 2,
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

  'POST /api/backend-categories/add-categories': (req, res) => {
    delay(() => res.json(responseData(null)));
  },
};
