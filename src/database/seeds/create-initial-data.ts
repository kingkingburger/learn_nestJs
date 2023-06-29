import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Workspaces } from '../../entities/Workspaces';
import { Channels } from '../../entities/Channels';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    // const workspaceesRepository = dataSource.getRepository(Workspaces);
    // const reuslt = await workspaceesRepository.insert([
    //   { id: 1, name: 'Sleact', url: 'sleact' },
    // ]);
    const channalsRepository = dataSource.getRepository(Channels);
    await channalsRepository.insert([
      {
        id: 1,
        name: '일반',
        Workspace: 1 as unknown as Workspaces,
        private: false,
      },
    ]);
  }
}
