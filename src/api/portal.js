/**
 * Created by dgunzi on 2018/5/2.
 */
const _portlets = {
  'layout': [{
    type: 'layout',
    size: [12, 12],
    height: '485',
    content: ['l_3', 'info']
  },
  {
    type: 'layout',
    size: [8, 8, 8],
    height: '400',
    content: ['info', 'hello', 'test']
  }],
  'clayout': [{
    id: 'l_3',
    size: [12, 12],
    height: '485',
    content: ['test', 'test']
  }],
  'components': ['info', 'hello', 'test']
};

export default {
  getPortlets (cb) {
    setTimeout(() => cb(_portlets), 100)
  }
}
