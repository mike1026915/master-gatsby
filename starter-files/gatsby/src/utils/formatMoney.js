const formatter = Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'NTD',
})

export default function formatMoney(cents) {
    return formatter.format(cents);
}