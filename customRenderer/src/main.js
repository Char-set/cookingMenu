import { createApp } from './runtime-canvas/index';

// 根组件
import App from './App'

// 根容器

import { getRootContainer } from './game'

createApp(App).mount(getRootContainer())