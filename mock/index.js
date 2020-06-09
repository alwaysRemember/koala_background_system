/*
 * @Author: Always
 * @LastEditors: Always
 * @Date: 2020-05-28 15:52:00
 * @LastEditTime: 2020-06-09 19:03:17
 * @FilePath: /koala_background_system/mock/index.js
 */

export const delay = cb => setTimeout(cb, 2000);

export const responseData = data => ({
  code: 0,
  data,
  message: '成功',
});

export default {
  'POST /backend-user/login': (req, res) => {
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
  'POST /backend-user/change-password': (req, res) => {
    delay(() => res.json(responseData(null)));
  },
};
