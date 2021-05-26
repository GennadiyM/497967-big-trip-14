import SmartView from './smart.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {ChartSetting, Selector, ChartType} from '../constants.js';
import {getTimeString} from '../utils/point.js';

const Formatter = {
  MONEY: (val) => `€ ${val}`,
  PRICE: (val) => `${val}x`,
  TIME_SPEND: (val) => getTimeString(val),
};

const sortDown = (typeA, typeB) => {
  if (typeA.data < typeB.data) return 1;
  if (typeA.data > typeB.data) return -1;

  return 0;
};

const getChartSettings = ({labels, data}, text, formatter) => {
  return {
    plugins: [ChartDataLabels],
    type: ChartSetting.TYPE,
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: ChartSetting.COLOR.WHITE,
          hoverBackgroundColor: ChartSetting.COLOR.WHITE,
          anchor: ChartSetting.ANCHOR.START,
          barThickness: ChartSetting.BAR_THICKNESS,
          minBarLength: ChartSetting.MIN_BAR_LENGTH,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: ChartSetting.DATA_FONT_SIZE,
          },
          color: ChartSetting.COLOR.BLACK,
          anchor: ChartSetting.ANCHOR.END,
          align: ChartSetting.ALIGN,
          formatter,
        },
      },
      title: {
        display: true,
        text,
        fontColor: ChartSetting.COLOR.BLACK,
        fontSize: ChartSetting.TITLE_FONT_SIZE,
        position: ChartSetting.TITLE_POSITION,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: ChartSetting.COLOR.BLACK,
              padding: ChartSetting.TICKS_PADDING,
              fontSize: ChartSetting.TICKS_FONT_SIZE,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  };
};

const createStatisticsTemplate = () => {
  return `<section class="statistics hidden">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends SmartView {
  constructor(pointsModel) {
    super();
    this._pointsModel = pointsModel;
    this._data = this._pointsModel.getPoints().slice();
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointsModel.addObserver(this._handleModelEvent);
    this._setCharts();
  }

  updateElement() {
    this._pointsModel.removeObserver(this._handleModelEvent);
    super.updateElement();
    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  restoreHandlers() {
    this._pointsModel.addObserver(this._handleModelEvent);
  }

  _getChartData(typeChart) {
    const dataChart = [];
    const values = [];

    switch(typeChart) {
      case ChartType.MONEY:
        this._types.forEach((label) => {
          const pricesOfType = this._data.filter((point) => point.type === label).map((point) => point.basePrice);
          dataChart.push(pricesOfType.reduce((sum, current) => sum + current, 0));
        });
        break;
      case ChartType.TYPE:
        this._types.forEach((label) => {
          dataChart.push(this._data.filter((point) => point.type === label).length);
        });
        break;
      case ChartType.TIME:
        this._types.forEach((label) => {
          const durationsOfType = this._data.filter((point) => point.type === label).map(({dateFrom, dateTo}) => dateTo - dateFrom);
          dataChart.push(durationsOfType.reduce((sum, current) => sum + current, 0));
        });
        break;
    }

    this._types.forEach((label, index) => {
      values.push({label, data: dataChart[index]});
    });

    values.sort(sortDown);

    return {
      labels: values.map(({label}) => label.toUpperCase()),
      data: values.map(({data}) => data),
    };
  }

  _setCharts() {
    const types = new Set();

    this._data.forEach((item)=> {
      types.add(item.type);
    });

    this._types = Array.from(types);

    const moneyCtx = this.getElement().querySelector(Selector.STATISTICS_MONEY);
    const typeCtx = this.getElement().querySelector(Selector.STATISTICS_TYPE);
    const timeCtx = this.getElement().querySelector(Selector.STATISTICS_TIME);

    moneyCtx.height = ChartSetting.BAR_HEIGHT * this._types.length;
    typeCtx.height = ChartSetting.BAR_HEIGHT * this._types.length;
    timeCtx.height = ChartSetting.BAR_HEIGHT * this._types.length;

    this._moneyChart = new Chart(moneyCtx, getChartSettings(this._getChartData(ChartType.MONEY), ChartSetting.TEXT.MONEY, Formatter.MONEY));
    this._typeChart = new Chart(typeCtx, getChartSettings(this._getChartData(ChartType.TYPE), ChartSetting.TEXT.TYPE, Formatter.PRICE));
    this._timeChart = new Chart(timeCtx, getChartSettings(this._getChartData(ChartType.TIME), ChartSetting.TEXT.TIME_SPEND, Formatter.TIME_SPEND));
  }

  _handleModelEvent() {
    this._data = this._pointsModel.getPoints().slice();
    this.updateElement();
  }
}
