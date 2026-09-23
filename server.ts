import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI(apiKey ? { apiKey } : {});

// In-Memory Data Store for REST API state
let storedProfile = {
  monthlyIncome: 60000,
  monthlyEssentialExpenses: 24000,
  monthlyDebtPayments: 16800,
  creditScore: 742,
  scoreSource: 'CIBIL',
  scoreDate: 'June 2026',
  totalCreditLimit: 200000,
  totalCreditUsed: 48000,
  paymentHistoryStatus: 'Excellent',
  onTimePaymentPercentage: 100,
  missedPaymentsLast24Months: 0,
  recentInquiriesLast6Months: 1,
  oldestCreditAccountYears: 3.5,
  financialGoals: ['Improve credit health', 'Reduce debt', 'Prepare for home/car purchase'],
  creditCards: [
    {
      id: 'card_hdfc_regalia',
      bankName: 'HDFC Bank',
      cardName: 'Regalia Gold Credit Card',
      limit: 120000,
      balance: 32000,
      statementDate: '15th of each month',
      dueDate: '5th of each month',
      minimumDue: 1600,
    },
    {
      id: 'card_icici_coral',
      bankName: 'ICICI Bank',
      cardName: 'Coral RuPay Credit Card',
      limit: 80000,
      balance: 16000,
      statementDate: '20th of each month',
      dueDate: '10th of each month',
      minimumDue: 800,
    },
  ],
  activeLoans: [
    {
      id: 'loan_bajaj_personal',
      lenderName: 'Bajaj Finance',
      loanType: 'Personal Loan',
      originalAmount: 150000,
      remainingAmount: 90000,
      monthlyEMI: 10500,
      tenureMonths: 18,
      remainingMonths: 9,
    },
    {
      id: 'loan_hdfc_twowheeler',
      lenderName: 'HDFC Bank',
      loanType: 'Two-Wheeler Loan',
      originalAmount: 65000,
      remainingAmount: 28000,
      monthlyEMI: 3900,
      tenureMonths: 24,
      remainingMonths: 8,
    },
  ],
};

let storedHistory = [
  { month: 'Jan', date: '2026-01-15', score: 680, utilization: 42, dti: 36, note: 'Initial reported baseline score' },
  { month: 'Feb', date: '2026-02-15', score: 695, utilization: 38, dti: 34, note: 'Personal loan EMI paid on time' },
  { month: 'Mar', date: '2026-03-15', score: 710, utilization: 33, dti: 31, note: 'Partial credit card dues cleared' },
  { month: 'Apr', date: '2026-04-15', score: 724, utilization: 29, dti: 29, note: 'Utilization dropped below 30% milestone' },
  { month: 'May', date: '2026-05-15', score: 735, utilization: 26, dti: 28, note: 'Continuous 100% on-time payment track' },
  { month: 'Jun', date: '2026-06-15', score: 742, utilization: 24, dti: 28, note: 'Current reported snapshot' },
];

let currentUser = {
  id: 'usr_rahul_sharma_98',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@example.com',
  phone: '+91 98765 43210',
  panNumber: 'ABCDE****F',
  joinedDate: 'January 2026',
};

// --- REST API ROUTES ---

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Credit Assistant API', timestamp: new Date().toISOString() });
});

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email } = req.body;
  const user = { ...currentUser, email: email || currentUser.email };
  res.json({ user, access_token: 'mock_jwt_token_indian_fintech_auth' });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email } = req.body;
  currentUser = {
    id: 'usr_' + Date.now(),
    name: name || 'Indian Borrower',
    email: email || 'user@example.com',
    phone: '+91 98765 43210',
    panNumber: 'ABCDE****F',
    joinedDate: 'September 2026',
  };
  res.json({ user: currentUser, access_token: 'mock_jwt_token_new_registration' });
});

app.get('/api/users/me', (req, res) => {
  res.json(currentUser);
});

// Financial Profile endpoints
app.get('/api/financial-profile', (req, res) => {
  res.json(storedProfile);
});

app.put('/api/financial-profile', (req, res) => {
  storedProfile = { ...storedProfile, ...req.body };
  res.json(storedProfile);
});

// Credit History endpoints
app.get('/api/credit-history', (req, res) => {
  res.json(storedHistory);
});

app.post('/api/credit-history', (req, res) => {
  const newPoint = req.body;
  storedHistory.push(newPoint);
  res.json(newPoint);
});

// Gemini AI Diagnostic Analysis Route
app.post('/api/ai/analyze', async (req, res) => {
  const { profile } = req.body;

  if (!apiKey) {
    // Return structured fallback if API key is not present in local dev
    return res.json({
      summary: `Your overall credit-health profile is steadily improving. At ${profile.dti}% DTI and ${profile.utilization}% utilization, revolving card payments remain your most actionable lever to cross into the prime 750+ score tier.`,
      health_status: profile.creditScore >= 750 ? 'Excellent' : 'Good',
      key_findings: [
        {
          title: `Credit utilization is ${profile.utilization > 30 ? 'elevated' : 'healthy'} at ${profile.utilization}%`,
          description: `Total revolving dues of ₹${(profile.totalCreditUsed || 0).toLocaleString('en-IN')} against ₹${(profile.totalCreditLimit || 0).toLocaleString('en-IN')} aggregate limit. Keeping balances under 15% is optimal for Indian credit scoring.`,
          severity: profile.utilization > 30 ? 'high' : 'medium',
        },
        {
          title: `Debt-to-Income (DTI) is manageable at ${profile.dti}%`,
          description: `Fixed monthly payments of ₹${(profile.monthlyDebtPayments || 0).toLocaleString('en-IN')} against ₹${(profile.monthlyIncome || 0).toLocaleString('en-IN')} income leave 72% disposable income buffer, comfortably meeting bank FOIR guidelines.`,
          severity: 'low',
        },
        {
          title: 'Payment history is exemplary (100% on-time)',
          description: 'Zero missed payments recorded over 24 months across active loan and credit facilities.',
          severity: 'low',
        },
      ],
      action_plan: [
        {
          step: 1,
          title: 'Reduce revolving credit card balance before statement dates',
          description: 'Pay down card dues 2 business days before statement generation dates so lower balances are reported to CIBIL and Experian.',
          why_it_matters: 'Credit bureaus calculate utilization from statement date balances, carrying ~30% scoring weight.',
          what_to_do: 'Set up mid-cycle automated transfers to keep the statement balance under 15% of your card limits.',
          priority: 'high',
        },
        {
          step: 2,
          title: 'Maintain automated NACH mandates for all loan EMIs',
          description: 'Ensure salary accounts have sufficient balance 48 hours prior to debit dates.',
          why_it_matters: 'Payment history constitutes the largest single weight (~35%) in Indian credit metrics.',
          what_to_do: 'Maintain a one-month EMI emergency buffer in your salary account.',
          priority: 'high',
        },
        {
          step: 3,
          title: 'Avoid multiple new credit applications within short windows',
          description: 'Refrain from applying for new personal loans or store cards for 6 months.',
          why_it_matters: 'Hard inquiries in quick succession can temporarily shave points and signal credit hunger.',
          what_to_do: 'Rely on bank pre-approved soft offers rather than fresh retail applications.',
          priority: 'medium',
        },
        {
          step: 4,
          title: 'Preserve your oldest active credit card account',
          description: 'Keep your oldest credit card active with minor periodic utility bills.',
          why_it_matters: 'Credit age represents ~15% of scoring. Closing an old card shortens your average file vintage.',
          what_to_do: 'Set a recurring subscription on the card with auto-debit enabled.',
          priority: 'low',
        },
        {
          step: 5,
          title: 'Perform an annual statutory credit report audit',
          description: 'Download your statutory free annual credit report from CIBIL or Experian.',
          why_it_matters: 'Identifies clerical errors, incorrect loan statuses, or delayed closure entries early.',
          what_to_do: "Verify that previously paid loans show 'Closed' with zero outstanding balance.",
          priority: 'low',
        },
      ],
      questions_to_consider: [
        'Are you planning a major home loan or property purchase within the upcoming 12 months?',
        'Can you request a credit limit enhancement without hard inquiries to naturally reduce utilization?',
        'Would prepaying your personal loan free up monthly cash flow to accelerate emergency savings?',
      ],
      disclaimer: 'Credit Assistant provides educational insights based on information entered by the user. It does not replace official credit reports or professional financial advice.',
      timestamp: new Date().toISOString(),
    });
  }

  try {
    const prompt = `You are a senior financial health advisor specializing in the Indian banking and credit ecosystem (CIBIL, Experian, CRIF High Mark, Equifax, RBI lending guidelines, and FOIR / Debt-to-Income standards).

Analyze this user's reported financial profile:
- Gross Monthly Income: ₹${profile.monthlyIncome}
- Monthly Debt / EMI Payments: ₹${profile.monthlyDebtPayments}
- Current Reported Credit Score: ${profile.creditScore} (Source: ${profile.scoreSource || 'CIBIL'})
- Aggregate Credit Card Limit: ₹${profile.totalCreditLimit}
- Revolving Credit Card Balance Used: ₹${profile.totalCreditUsed}
- Credit Utilization: ${profile.utilization}%
- Debt-to-Income (DTI / FOIR): ${profile.dti}%
- Missed Payments (24 months): ${profile.missedPayments || 0}
- Hard Inquiries (6 months): ${profile.recentInquiries || 1}
- Financial Goals: ${JSON.stringify(profile.financialGoals || [])}

Provide a comprehensive, objective diagnostic analysis adhering strictly to these safety standards:
1. Do NOT claim to calculate an official CIBIL score.
2. Address user's entered credit score as their current reported score.
3. Focus on controllable levers: reducing revolving card utilization, punctual repayments, managing DTI/FOIR, and credit age.
4. Output must match the exact JSON schema requested.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            health_status: { type: Type.STRING, enum: ['Excellent', 'Good', 'Fair', 'Needs Attention'] },
            key_findings: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
                },
                required: ['title', 'description', 'severity'],
              },
            },
            action_plan: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  step: { type: Type.INTEGER },
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  why_it_matters: { type: Type.STRING },
                  what_to_do: { type: Type.STRING },
                  priority: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
                },
                required: ['step', 'title', 'description', 'why_it_matters', 'what_to_do', 'priority'],
              },
            },
            questions_to_consider: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            disclaimer: { type: Type.STRING },
          },
          required: ['summary', 'health_status', 'key_findings', 'action_plan', 'questions_to_consider'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    parsed.disclaimer = 'Credit Assistant provides educational insights based on information entered by the user. It does not replace official credit reports or professional financial advice.';
    parsed.timestamp = new Date().toISOString();
    res.json(parsed);
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ error: 'Failed to generate AI analysis' });
  }
});

// Gemini AI Interactive Q&A Chat Route
app.post('/api/ai/chat', async (req, res) => {
  const { question, profileContext, conversationHistory } = req.body;

  if (!apiKey) {
    return res.json({
      answer: `Regarding "${question}": In the Indian credit ecosystem, managing your revolving utilization (currently ${profileContext?.utilization || 24}%) and keeping your DTI under 35% are the strongest levers for credit health. Punctual repayments through automated NACH instructions ensure your file remains prime across all bureaus like CIBIL and Experian.`,
    });
  }

  try {
    const prompt = `You are a financial health advisor specializing in the Indian banking and credit ecosystem (CIBIL, Experian, CRIF, FOIR, RBI guidelines).
User Profile Context:
- Score: ${profileContext?.score}
- Income: ₹${profileContext?.income}
- Monthly Debt: ₹${profileContext?.debtPayments}
- Utilization: ${profileContext?.utilization}%
- DTI: ${profileContext?.dti}%

User Question: "${question}"

Respond with concise, accurate, actionable guidance tailored to Indian consumers. Do not predict exact future credit scores; explain the mechanics clearly with practical steps. Keep response within 2-3 paragraphs. Include relevant educational context.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.json({ answer: response.text });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process chat question' });
  }
});

// Vite Middleware mounting for Dev or Static files for Production
async function startServer() {
  const distPath = path.resolve(__dirname, 'dist');
  const indexHtmlPath = path.resolve(distPath, 'index.html');
  const hasDist = fs.existsSync(indexHtmlPath);

  // If running in production (or on Cloud Run preview container without dev command), serve the compiled build
  const isProduction =
    process.env.NODE_ENV === 'production' ||
    Boolean(process.env.K_SERVICE && !process.env.K_SERVICE.includes('ais-dev')) ||
    (hasDist && process.env.npm_lifecycle_event === 'start');

  if (isProduction && hasDist) {
    console.log('Serving production static build from dist/');
    app.use(express.static(distPath));
    app.use((req, res, next) => {
      if (req.method === 'GET' && !req.path.startsWith('/api')) {
        return res.sendFile(indexHtmlPath);
      }
      next();
    });
  } else {
    try {
      const vite = await createViteServer({
        server: {
          middlewareMode: true,
          port: PORT,
          host: '0.0.0.0',
        },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.warn('Vite dev middleware failed, falling back to static build:', err);
      if (hasDist) {
        app.use(express.static(distPath));
        app.use((req, res, next) => {
          if (req.method === 'GET' && !req.path.startsWith('/api')) {
            return res.sendFile(indexHtmlPath);
          }
          next();
        });
      }
    }
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Credit Assistant server running on port ${PORT}`);
  });
}

startServer();
