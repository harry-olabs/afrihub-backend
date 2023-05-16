import { DataSource, DataSourceOptions } from 'typeorm';
import ormConfig from '../../ormconfig';

export default new DataSource(ormConfig as DataSourceOptions);
