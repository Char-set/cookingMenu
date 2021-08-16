import { createApp } from './src/runtime-canvas/index';

// 根组件
import App from './src/App'

// 根容器

import { getRootContainer } from './src/Game'

createApp(App).mount(getRootContainer())