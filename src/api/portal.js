/**
 * Created by dgunzi on 2018/5/2.
 */
const _portlets = {
  'layout': [{
    type: 'layout',
    size: [12, 12],
    height: '485',
    content: ['l_3', 'line1']
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
    content: ['table1', 'chart1']
  }],
  'components': ['info', 'hello', 'test', 'chart1', 'line1', 'table1']
};

export default {
  getPortlets (cb) {
    setTimeout(() => cb(_portlets), 100)
  }
}
