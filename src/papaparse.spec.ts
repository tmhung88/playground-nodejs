import Papa from 'papaparse'
describe('papaparse', () => {
  describe('unparse()', () => {
    it('unparse json arrays with the given column fields', () => {
      const users = [
        {
          userId: '20738741-d71b-4017-ba62-543bb9801c03',
          username: 'Zoila_Swift',
          email: 'Zita36@hotmail.com',
          avatar: 'https://avatars.githubusercontent.com/u/31354456',
          password: 'HsTYTkyTnRLvlZj',
          birthdate: '1979-08-18T17:16:52.534Z',
          registeredAt: '2023-03-23T01:03:26.628Z',
          country: 'Norfolk Island',
        },
        {
          userId: 'f9987ec1-b671-40f5-b3c4-c193f323aea8',
          username: 'Luna89',
          email: 'Tyshawn.Brekke30@yahoo.com',
          avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/219.jpg',
          password: 'GDlqTut7Ar0xeZU',
          birthdate: '1951-03-30T15:45:25.178Z',
          registeredAt: '2023-07-08T05:17:20.001Z',
          country: 'Mexico',
        },
        {
          userId: 'f6d988d5-9f7e-4846-915a-a9632baffebd',
          username: 'Robert.Labadie82',
          email: 'Kyleigh66@yahoo.com',
          avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/756.jpg',
          password: 'JqYNdIFstX0KYn4',
          birthdate: '1956-07-30T07:06:15.914Z',
          registeredAt: '2023-06-08T00:34:19.684Z',
          country: 'United Arab Emirates',
        },
        {
          userId: '204d73c8-2071-40ca-896c-99944e58dc3e',
          username: 'Mariam18',
          email: 'Deven_Maggio70@hotmail.com',
          avatar: 'https://avatars.githubusercontent.com/u/42002383',
          password: 'R4HWYtK2f7ipZ2W',
          birthdate: '1994-04-12T13:28:15.435Z',
          registeredAt: '2023-02-20T08:00:17.765Z',
          country: 'Colombia',
        },
        {
          userId: 'c7ee8170-43b0-4f61-bd3d-3d297934c324',
          username: 'Una16',
          email: 'Coleman.OConnell@hotmail.com',
          avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/381.jpg',
          password: 'qEU_1dr2fe_Jq9O',
          birthdate: '1990-01-05T18:07:40.712Z',
          registeredAt: '2023-01-23T09:51:01.689Z',
          country: 'Eswatini',
        },
        {
          userId: '970dbe55-9d79-47c6-9ebc-8fcf4bb17a02',
          username: 'Telly96',
          email: 'Dan_Zemlak@gmail.com',
          avatar: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/834.jpg',
          password: 'AidGX4SY3BSczs7',
          birthdate: '1970-10-11T12:35:24.380Z',
          registeredAt: '2023-05-21T04:23:17.055Z',
          country: 'Lithuania',
        },
      ]

      const csvData = Papa.unparse(users, {
        columns: ['userId', 'username', 'country'],
      })
      expect(csvData).toMatchSnapshot()
    })
  })

  describe('parse', () => {
    it('parse csv data', () => {
      const content = `Date   , Visitor , ViewCount
      2023-01-05, peter@email.lcom, 15`
      const parseCsvResult = Papa.parse(content, {
        header: true,
        skipEmptyLines: true,
        transformHeader(header: string, index: number): string {
          return header.trim()
        },
      })
      expect([
        {
          Date: '      2023-01-05',
          Visitor: ' peter@email.lcom',
          ViewCount: ' 15',
        },
      ])
    })
  })
})
