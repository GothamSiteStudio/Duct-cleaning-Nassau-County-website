// ============================================
// Invoice Calculator & Manager
// ============================================

const DEFAULT_TAX_RATE = 8.875; // NY Nassau County default

const InvoiceManager = {
  lineItems: [],
  taxRate: DEFAULT_TAX_RATE,
  customTax: false,
  discount: 0,
  paymentMethod: '',

  // Add a new empty line item
  addLineItem() {
    this.lineItems.push({
      id: Date.now(),
      description: '',
      qty: 1,
      unitPrice: 0,
      discount: 0,
      taxable: true
    });
    this.render();
  },

  // Remove a line item by id
  removeLineItem(id) {
    this.lineItems = this.lineItems.filter(item => item.id !== id);
    this.render();
  },

  // Update a line item field
  updateLineItem(id, field, value) {
    const item = this.lineItems.find(i => i.id === id);
    if (!item) return;
    if (field === 'description') {
      item.description = value;
    } else if (field === 'taxable') {
      item.taxable = value;
    } else {
      item[field] = parseFloat(value) || 0;
    }
    this.recalculate();
  },

  // Calculate line total
  getLineTotal(item) {
    const base = item.qty * item.unitPrice;
    return Math.max(0, base - item.discount);
  },

  // Get line tax
  getLineTax(item) {
    if (!item.taxable) return 0;
    return this.getLineTotal(item) * (this.taxRate / 100);
  },

  // Recalculate all totals
  recalculate() {
    let subtotal = 0;
    let totalTax = 0;

    this.lineItems.forEach(item => {
      const lineTotal = this.getLineTotal(item);
      const lineTax = this.getLineTax(item);
      subtotal += lineTotal;
      totalTax += lineTax;
    });

    const grandTotal = subtotal + totalTax - this.discount;

    // Update UI
    document.getElementById('subtotalDisplay').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('taxRateDisplay').textContent = this.taxRate.toFixed(3) + '%';
    document.getElementById('taxAmountDisplay').textContent = '$' + totalTax.toFixed(2);
    document.getElementById('discountDisplay').textContent = '-$' + this.discount.toFixed(2);
    document.getElementById('grandTotalDisplay').textContent = '$' + Math.max(0, grandTotal).toFixed(2);
    document.getElementById('balanceDueDisplay').textContent = '$' + Math.max(0, grandTotal).toFixed(2);

    // Update line totals in the table
    this.lineItems.forEach(item => {
      const el = document.getElementById(`lineTotal-${item.id}`);
      if (el) el.textContent = '$' + (this.getLineTotal(item) + this.getLineTax(item)).toFixed(2);
    });

    return { subtotal, totalTax, grandTotal: Math.max(0, grandTotal) };
  },

  // Set tax rate
  setTaxRate(rate) {
    this.taxRate = parseFloat(rate) || 0;
    this.recalculate();
  },

  // Set global discount
  setDiscount(amount) {
    this.discount = parseFloat(amount) || 0;
    this.recalculate();
  },

  // Render line items in the table
  render() {
    const tbody = document.getElementById('lineItemsBody');
    tbody.innerHTML = '';

    this.lineItems.forEach((item, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${index + 1}</td>
        <td>
          <input type="text" class="inv-input inv-input-desc" value="${this.escapeHtml(item.description)}"
            placeholder="Service description"
            onchange="InvoiceManager.updateLineItem(${item.id}, 'description', this.value)">
        </td>
        <td>
          <input type="number" class="inv-input inv-input-sm" value="${item.qty}" min="1" step="1"
            onchange="InvoiceManager.updateLineItem(${item.id}, 'qty', this.value)">
        </td>
        <td>
          <input type="number" class="inv-input inv-input-sm" value="${item.unitPrice}" min="0" step="0.01"
            onchange="InvoiceManager.updateLineItem(${item.id}, 'unitPrice', this.value)">
        </td>
        <td>
          <input type="number" class="inv-input inv-input-sm" value="${item.discount}" min="0" step="0.01"
            onchange="InvoiceManager.updateLineItem(${item.id}, 'discount', this.value)">
        </td>
        <td style="text-align: center;">
          <input type="checkbox" ${item.taxable ? 'checked' : ''}
            onchange="InvoiceManager.updateLineItem(${item.id}, 'taxable', this.checked)">
        </td>
        <td class="r" id="lineTotal-${item.id}">$0.00</td>
        <td>
          <button class="btn-remove-line" onclick="InvoiceManager.removeLineItem(${item.id})" title="Remove line">&times;</button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    this.recalculate();
  },

  // Escape HTML to prevent XSS
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  // Generate next invoice number
  async getNextInvoiceNumber() {
    try {
      const { data, error } = await db
        .from('invoices')
        .select('invoice_number')
        .order('created_at', { ascending: false })
        .limit(1);

      if (error) throw error;
      if (data && data.length > 0) {
        const lastNum = parseInt(data[0].invoice_number.replace(/\D/g, '')) || 0;
        return String(lastNum + 1).padStart(4, '0');
      }
    } catch (e) {
      console.log('Could not get last invoice number:', e.message);
    }
    return '0001';
  },

  // Save invoice to Supabase
  async save(formData) {
    const totals = this.recalculate();

    // Upsert customer
    const { data: customer, error: custError } = await db
      .from('customers')
      .upsert({
        name: formData.customerName,
        phone: formData.customerPhone,
        email: formData.customerEmail,
        address: formData.jobAddress,
        city: formData.jobCity,
        state: formData.jobState,
        zip: formData.jobZip
      }, { onConflict: 'phone' })
      .select()
      .single();

    if (custError) throw custError;

    // Create invoice
    const { data: invoice, error: invError } = await db
      .from('invoices')
      .insert({
        invoice_number: formData.invoiceNumber,
        customer_id: customer.id,
        date_issued: formData.dateIssued,
        subtotal: totals.subtotal,
        tax_rate: this.taxRate,
        tax_amount: totals.totalTax,
        discount: this.discount,
        total: totals.grandTotal,
        payment_method: formData.paymentMethod,
        status: formData.status || 'pending',
        notes: formData.notes || ''
      })
      .select()
      .single();

    if (invError) throw invError;

    // Create line items
    const items = this.lineItems
      .filter(i => i.description.trim())
      .map(item => ({
        invoice_id: invoice.id,
        description: item.description,
        qty: item.qty,
        unit_price: item.unitPrice,
        discount: item.discount,
        taxable: item.taxable,
        line_total: this.getLineTotal(item) + this.getLineTax(item)
      }));

    if (items.length > 0) {
      const { error: itemsError } = await db
        .from('invoice_items')
        .insert(items);
      if (itemsError) throw itemsError;
    }

    return invoice;
  },

  // Load an existing invoice for preview
  async loadInvoice(id) {
    const { data: invoice, error } = await db
      .from('invoices')
      .select('*, customers(*), invoice_items(*)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return invoice;
  }
};
