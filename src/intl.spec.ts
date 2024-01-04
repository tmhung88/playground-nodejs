describe('Intl', () => {
  describe('NumberFormat', () => {
    it('should format money with grouping', () => {
      const moneyFormatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      })
      expect(moneyFormatter.format(1133)).toStrictEqual('$1,133')
    })

    it('should format number with grouping', () => {
      const moneyFormatter = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 1,
        maximumFractionDigits: 3,
      })
      expect(moneyFormatter.format(1111)).toStrictEqual('1,111.0')
      expect(moneyFormatter.format(1.34567)).toStrictEqual('1.346')
    })
  })
})
