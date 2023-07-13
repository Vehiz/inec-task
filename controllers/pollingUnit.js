import { PollingUnit, Ward, LGA, AnnouncedPuResults } from '../models/index.js';

// GET /polling-unit/:id
export const pollingUnit = (req, res) => {
    const pollingUnitId = req.params.id;
  
    PollingUnit.findByPk(pollingUnitId, {
      include: [
        {
          model: Ward,
          include: LGA,
        },
      ],
    })
      .then((pollingUnit) => {
        if (!pollingUnit) {
          return res.status(404).send('Polling unit not found');
        }
  
        AnnouncedPuResults.findAll({
          where: { polling_unit_uniqueid: pollingUnitId },
        })
          .then((results) => {
            res.render('polling_unit', { pollingUnit, results });
          })
          .catch((error) => {
            console.error('Error querying the database:', error);
            res.status(500).send('Internal server error');
          });
      })
      .catch((error) => {
        console.error('Error querying the database:', error);
        res.status(500).send('Internal server error');
      });
  };
  
  export const storeResult = async (req, res) => {
    const { pollingUnitId, results } = req.body;
    AnnouncedPuResults.bulkCreate(results.map((result) => ({
      polling_unit_uniqueid: pollingUnitId,
      party_abbreviation: result.partyAbbreviation,
      party_score: result.partyScore,
    })))
      .then(() => {
        res.redirect('/success');
      })
      .catch((error) => {
        console.error('Error saving results to the database:', error);
        res.status(500).send('Internal server error');
      });
    
  
   }
   export const sumResult = (req, res) => {
    const localGovernmentId = req.params.id;
  
    // Query the database to calculate the summed total result for the specified local government
    AnnouncedPuResults.findAll({
        attributes: [
          'party_abbreviation',
          [sequelize.fn('SUM', sequelize.col('party_score')), 'total_score'],
        ],
        include: [
          {
            model: PollingUnit,
            where: { lga_id: localGovernmentId },
          },
        ],
        group: ['party_abbreviation'],
      })
        .then((results) => {
          res.render('local_government', { results });
        })
        .catch((error) => {
          console.error('Error querying the database:', error);
          res.status(500).send('Internal server error');
        });
      
    // Render the result on a web page using a template engine
  };
  