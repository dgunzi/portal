/**
 * Created by alex on 2017/5/24.
 */
module.exports = {
  data() {
    return {
      rowUuid: {},
      loading: false,
      files: [],
      total: 0,
      pageSize: 10,
      currentPage: 1,
      treeData: [],
      defaultProps: {
        children: 'childrenList',
        label: 'name',
        id: 'uuid'
      },
      showAuth: false
    }
  }
}
