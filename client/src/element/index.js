import {
    Message, Button, Menu, MenuItem, Form, FormItem, Steps, Step, Select, Option, Divider, Row, Col, Link,
    Tag, Card, Pagination, Backtop, Tabs, TabPane, Dialog, Input, Alert, Checkbox, Submenu,
} from "element-ui";


// 重写 Message 方法，引入 offset 偏移量设置
const $message = options => {
  return Message({
    ...options,
    offset: 80
  });
};
//重写一遍success的方法,将offset写入options
['success', 'warning', 'info', 'error'].forEach(type => {
  $message[type] = options => {
    if (typeof options === 'string') {
      options = {
        message: options,
        offset: 80
      };
    }
    options.type = type;
    return Message(options);
  };
});

const element = {
    install: function (Vue) {
        Vue.use(Button);
        Vue.use(Menu);
        Vue.use(MenuItem);
        Vue.use(Form);
        Vue.use(FormItem);
        Vue.use(Steps);
        Vue.use(Step);
        Vue.use(Select);
        Vue.use(Option);
        Vue.use(Divider);
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(Link);
        Vue.use(Tag);
        Vue.use(Card);
        Vue.use(Pagination);
        Vue.use(Backtop);
        Vue.use(Tabs);
        Vue.use(TabPane);
        Vue.use(Dialog);
        Vue.use(Input);
        Vue.use(Alert);
        Vue.use(Checkbox);
        Vue.use(Submenu);

        Vue.component(Message);
        Vue.prototype.$message = $message;
        Vue.prototype.$message.closeAll = Message.closeAll;
    }
}

export default element;