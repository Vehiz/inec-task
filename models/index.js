
import {Sequelize, Model, DataTypes} from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
class PollingUnit extends Sequelize.Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          uniqueid: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          ward_id: {
            type: DataTypes.INTEGER,
          },
          lga_id: {
            type: DataTypes.INTEGER,
          },
          state_id: {
            type: DataTypes.INTEGER,
          },
        },
        {
          sequelize,
          modelName: 'PollingUnit',
        }
      );
    }
  
    static associate(models) {
      this.belongsTo(models.Ward, { foreignKey: 'ward_id' });
    }
  }
  
  class Ward extends Sequelize.Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          ward_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          ward_name: {
            type: DataTypes.STRING,
          },
        },
        {
          sequelize,
          modelName: 'Ward',
        }
      );
    }
  
    static associate(models) {
      this.belongsTo(models.LGA, { foreignKey: 'lga_id' });
    }
  }
  
  class LGA extends Sequelize.Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          lga_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          lga_name: {
            type: DataTypes.STRING,
          },
        },
        {
          sequelize,
          modelName: 'LGA',
        }
      );
    }
  }
  
  class AnnouncedPuResults extends Sequelize.Model {
    static init(sequelize, DataTypes) {
      return super.init(
        {
          result_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
          },
          polling_unit_uniqueid: {
            type: DataTypes.INTEGER,
          },
          party_abbreviation: {
            type: DataTypes.STRING,
          },
          party_score: {
            type: DataTypes.INTEGER,
          },
        },
        {
          sequelize,
          modelName: 'AnnouncedPuResults',
        }
      );
    }
  }
  
  PollingUnit.init(sequelize, DataTypes);
  Ward.init(sequelize, DataTypes);
  LGA.init(sequelize, DataTypes);
  AnnouncedPuResults.init(sequelize, DataTypes);
  
  PollingUnit.associate({ Ward });
  Ward.associate({ LGA });
  
  export { PollingUnit, Ward, LGA, AnnouncedPuResults };
  