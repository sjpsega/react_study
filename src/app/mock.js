import { http, HttpResponse, delay } from 'msw'
import { setupWorker } from 'msw/browser'
import config from './config'

const urlSplice = path => `${config.BaseUrl}${path}`;

const todoInitialData = [{
    id:1,
    content: 'Hedy Lamarr',
    isComplete: false
  },
  {
    id:2,
    content: 'Hedy Lamarr2',
    isComplete: false
  },
  {
    id:3,
    content: 'Hedy Lamarr3',
    isComplete: true
  }]
  
const handlers = [
    http.get(urlSplice('/todoList'), async () => {
            await delay(1000)
            return HttpResponse.json(todoInitialData)
        }
    )
]

export const worker = setupWorker(...handlers)