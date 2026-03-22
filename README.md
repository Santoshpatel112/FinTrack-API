src/
│
├── config/
│   ├── db.js
│   └── env.js
│
├── controllers/
│   ├── auth.controller.js
│   ├── user.controller.js
│   ├── transaction.controller.js
│   ├── category.controller.js
│   ├── budget.controller.js
│   └── analytics.controller.js
│
├── models/
│   ├── User.Model.js
│   ├── Transaction.Model.js
│   ├── Category.Model.js
│   └── Budget.Model.js
│
├── routes/
│   ├── auth.routes.js
│   ├── user.routes.js
│   ├── transaction.routes.js
│   ├── category.routes.js
│   ├── budget.routes.js
│   └── analytics.routes.js
│
├── middleware/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   └── error.middleware.js
│
├── services/              
│   ├── transaction.service.js
│   ├── analytics.service.js
│   └── budget.service.js
│
├── utils/
│   ├── constants.js
│   └── helpers.js
│
├── validations/
│   ├── transaction.validation.js
│   └── budget.validation.js
│
├── jobs/                  
│   ├── budgetAlert.job.js
│   └── monthlyReport.job.js
│
├── app.js
└── server.js