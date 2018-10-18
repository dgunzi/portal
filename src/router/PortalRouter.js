/**
 * Created by alex on 2017/8/18.
 */
// 账号管理一级
let Portal = () => import('@/home/Portal')
// 默认模板
let PortalRouter = [
  {path: '', name: 'Portal', component: Portal}
]

export default PortalRouter;
