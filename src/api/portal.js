/**
 * Created by dgunzi on 2018/5/2.
 */
const _portlets = {
  'layout': [{
    size: [12, 12],
    height: '485',
    content: [{
        id: 'l_3',
        size: [12, 12],
        height: '485',
        content: ['table1', 'chart1']
    }, 'line1']
  },
  {
    size: [8, 8, 8],
    height: '400',
    content: ['test', 'hello', 'test']
  }]
};

export default {
  getPortlets (cb) {
    setTimeout(() => cb(_portlets), 100)
  }
}
