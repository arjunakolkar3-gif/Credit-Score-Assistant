export interface CreditKnowledgeItem {
  id: string;
  category: 'CIBIL & Bureaus' | 'Utilization' | 'DTI & FOIR' | 'Credit Mix' | 'Disputes';
  title: string;
  summary: string;
  content: string;
  keyRule: string;
}

export const CREDIT_KNOWLEDGE_BASE: CreditKnowledgeItem[] = [
  {
    id: 'kb_bureau_score',
    category: 'CIBIL & Bureaus',
    title: 'How Credit Bureaus in India Work',
    summary: 'India has four licensed credit information companies (CICs): TransUnion CIBIL, Experian, CRIF High Mark, and Equifax.',
    content: 'Banks and NBFCs transmit your credit activity to these bureaus once every 30 to 45 days. Scores range between 300 and 900. A score of 750 or higher is widely considered prime by Indian lenders, unlocking lower home loan interest rates (up to 50 bps reduction) and faster processing.',
    keyRule: 'Credit Assistant tracks your self-reported or entered score. Official credit reports should be checked annually directly with CICs.'
  },
  {
    id: 'kb_utilization',
    category: 'Utilization',
    title: 'The 30% Revolving Credit Utilization Threshold',
    summary: 'Utilization measures the portion of your total revolving credit limit you actively use.',
    content: 'If your credit card limit is ₹2,00,000 and your statement balance is ₹60,000, your utilization is 30%. Indian banks recommend keeping overall and per-card utilization below 30% (ideally below 15%) because high utilization signals liquidity pressure, even if you repay the full balance on the due date.',
    keyRule: 'Pro-Tip: Pay a portion of your card balance 2 days BEFORE your statement date so a lower balance is submitted to CIBIL/Experian.'
  },
  {
    id: 'kb_dti_foir',
    category: 'DTI & FOIR',
    title: 'Debt-to-Income (DTI) vs FOIR in Indian Underwriting',
    summary: 'Indian lenders evaluate your Fixed Obligation to Income Ratio (FOIR) when assessing new loan applications.',
    content: 'FOIR or DTI is the percentage of your net monthly in-hand salary committed to debt EMIs and minimum credit dues. Under RBI guidelines and bank credit policies, lenders cap FOIR at 40% to 50% for standard personal loans, and up to 55-60% for high-income home loan applicants. Maintaining DTI under 35% keeps you in the safest approval bracket.',
    keyRule: 'DTI = (Monthly EMIs + Card Minimum Dues) ÷ Gross Monthly Income × 100.'
  },
  {
    id: 'kb_credit_mix',
    category: 'Credit Mix',
    title: 'Balanced Credit Mix: Secured vs Unsecured',
    summary: 'A healthy credit profile features a prudent balance of secured (collateral-backed) and unsecured loans.',
    content: 'Having only credit cards and personal loans (unsecured debt) can make lenders cautious during high-value loan evaluations. Having a mix of secured debt (like a home loan, gold loan, or auto loan) alongside revolving cards demonstrates experience handling diverse credit facilities responsibly.',
    keyRule: 'Never borrow just to build credit mix. Only take loans for genuine financial needs with verified repayment plans.'
  },
  {
    id: 'kb_disputes',
    category: 'Disputes',
    title: 'Resolving Errors in Indian Credit Reports',
    summary: "Clerical errors, identity mix-ups, or delayed 'No Due' closures can depress your reported score.",
    content: "If an account is marked 'Written Off' or 'Settled' by mistake, or if a paid-off loan still shows active, you have the statutory right under the Credit Information Companies (Regulation) Act, 2005 (CICRA) to file a dispute online via the respective bureau portal. Bureaus are mandated to resolve disputes with the lender within 30 days.",
    keyRule: 'Always preserve the No Objection Certificate (NOC) and Closure Letter from lenders after foreclosing loans.'
  }
];
