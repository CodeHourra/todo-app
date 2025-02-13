import { useEffect } from 'react'
import * as echarts from 'echarts'

interface Todo {
  id: number
  text: string
  completed: boolean
  priority: 'high' | 'medium' | 'low'
}

interface StatsProps {
  todos: Todo[]
}

function Stats({ todos }: StatsProps) {
  useEffect(() => {
    const completionChart = echarts.init(document.getElementById('completion-chart'))
    const priorityChart = echarts.init(document.getElementById('priority-chart'))

    const completedCount = todos.filter(todo => todo.completed).length
    const totalCount = todos.length

    const completionOption = {
      title: { text: '任务完成情况', left: 'center' },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: '50%',
        data: [
          { value: completedCount, name: '已完成' },
          { value: totalCount - completedCount, name: '未完成' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }

    const priorityCounts = {
      high: todos.filter(todo => todo.priority === 'high').length,
      medium: todos.filter(todo => todo.priority === 'medium').length,
      low: todos.filter(todo => todo.priority === 'low').length
    }

    const priorityOption = {
      title: { text: '任务优先级分布', left: 'center' },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['高优先级', '中优先级', '低优先级']
      },
      yAxis: { type: 'value' },
      series: [{
        type: 'bar',
        data: [priorityCounts.high, priorityCounts.medium, priorityCounts.low],
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const colors = ['#ff4444', '#ffbb33', '#33b5e5']
            return colors[params.dataIndex]
          }
        }
      }]
    }

    completionChart.setOption(completionOption)
    priorityChart.setOption(priorityOption)

    return () => {
      completionChart.dispose()
      priorityChart.dispose()
    }
  }, [todos])

  return (
    <div className="stats-page">
      <h1>数据统计</h1>
      <div className="stats-container">
        <div id="completion-chart" className="chart"></div>
        <div id="priority-chart" className="chart"></div>
      </div>
    </div>
  )
}

export default Stats