import dotenv from 'dotenv'
import { Column, DataSource, Entity, PrimaryColumn } from 'typeorm'
import { DataSourceOptions } from 'typeorm/data-source/DataSourceOptions'

dotenv.config()

@Entity('sentry_events')
export class SentryEvent {
  @PrimaryColumn()
  id: string

  @Column({})
  timestamp: Date

  @Column({ nullable: true, type: 'varchar' })
  title: string | null

  @Column({ nullable: true, type: 'varchar' })
  transaction: string | null

  @Column({ nullable: true, type: 'varchar', name: 'projectName' })
  ['project.name']: string | null

  @Column({ nullable: true, type: 'varchar' })
  runtime: string | null

  @Column({ nullable: true, type: 'varchar', name: 'userDisplay' })
  ['user.display']: string | null

  @Column({ nullable: true, type: 'varchar' })
  release: string | null

  @Column({ nullable: true, type: 'varchar' })
  url: string | null

  @Column({ nullable: true, type: 'varchar' })
  environment: string | null

  @Column({ nullable: true, type: 'varchar', name: 'serverName' })
  ['server_name']: string | null

  @Column({ nullable: true, type: 'varchar' })
  device: string

  @Column({ nullable: true, type: 'varchar' })
  replayId: string | null

  @Column({ nullable: true, type: 'varchar' })
  os: string | null
}

@Entity('items')
export class Item {
  @PrimaryColumn()
  id: number

  @Column({ type: 'varchar', nullable: false })
  description: string
}

const dataSourceOpts: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number.parseInt(String(process.env.POSTGRES_PORT)),
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: process.env.POSTGRES_SYNC === 'true',
  logging: process.env.POSTGRES_LOGGING === 'true',
  entities: [Item, SentryEvent],
}

console.log(`DataSourceOpts\n${JSON.stringify(dataSourceOpts, null, 2)}`)
export const AppDataSource = new DataSource(dataSourceOpts)
type SqlFunc<T> = (dataSource: DataSource) => Promise<T>
export async function executeSqlFn<T>(sqlFunc: SqlFunc<T>): Promise<T> {
  try {
    await AppDataSource.initialize()
    return await sqlFunc(AppDataSource)
  } finally {
    // await AppDataSource.destroy()
  }
}
