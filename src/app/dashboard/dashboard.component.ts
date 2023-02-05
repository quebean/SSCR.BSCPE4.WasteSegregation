import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { Redeem } from '../models/redeem.model';
import { Transaction } from '../models/transaction.model';
import { User } from '../models/user.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  user!: User;
  transactions!: Transaction[];
  redeems!: Redeem[];
  
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getUser().subscribe(user =>{
      this.user = user;
      this.dataService.GetTransactionsByTagId(this.user.tagId).subscribe((transactions) => {
        this.transactions = transactions;
        this.renderTransactionsBarChart();
      })
      
      this.dataService.GetRedeemsBySubjectId(this.user.subjectId).subscribe(redeems => {
        this.redeems = redeems;
        // this.renderRedeemLineChart();
      })
    });
  }

  renderTransactionsBarChart(): void {
    let metal = 0;
    let plastic = 0;
    let paper = 0;

    this.transactions.forEach((transaction) => {
      metal = metal + transaction.metal;
      paper = paper + transaction.paper;
      plastic = plastic + transaction.plastic;
    })

    let barChartData: number[] = [metal, plastic, paper];

    const chart = new Chart('transactionsBarChart', {
      type: 'bar',
      data: {
        labels: ['Metal', 'Plastic', 'Paper'],
        datasets: [{
          label: 'Total Waste by Types',
          data: barChartData,
          backgroundColor: [
            '#006C4C', 
            '#006C4C', 
            '#006C4C'
          ],
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    });
  }

  renderRedeemLineChart(): void {
    let redeemData = this.transformRedeemData();

    let dayName = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
    let label = redeemData.map(redeemData => {
      let date = new Date(redeemData.date);

      return dayName[date.getDay()];
    })

    let data = redeemData.map(redeemData => {
      return redeemData.amount;
    })

    console.log(label);
    console.log(data);

    const chart = new Chart('redeemLineChart', {
      type: 'line',
      data: {
        labels: label,
        datasets: [{
          label: 'Redeem History',
          data: data,
          fill: false,
          borderColor: '#006C4C'
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          }
        }
      },
    })
  }


  transformRedeemData(): any[] {
    let data: any[] = []

    let currentDate = new Date(this.redeems[0].createdAt!).toDateString();
    let amount = this.redeems[0].amount;
    for (let i = 1; i < this.redeems.length; i++) {
      if (data.length < 7) {
        if (currentDate == new Date(this.redeems[i].createdAt!).toDateString()) {
          amount = this.redeems[i].amount + amount;
        } else {
          data.unshift({
            date: currentDate,
            amount: amount
          })
          currentDate = new Date(this.redeems[i].createdAt!).toDateString()
          amount = this.redeems[i].amount;
        }
      } else {
        break
      }
    }
    data.unshift({
      date: currentDate,
      amount: amount
    })
    return data;
  }
}