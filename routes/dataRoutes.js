const express = require('express');
const router = express.Router();
const { pool, poolConnect, sql } = require('../db');

// Get Total Accidents
router.get('/total-accidents', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`SELECT COUNT(*) AS total FROM AccidentData`);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/possible-injury', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT COUNT(*) AS count FROM AccidentData WHERE INJ_SEV = '1'
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/minor-injury', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT COUNT(*) AS count FROM AccidentData WHERE INJ_SEV = '2'
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/serious-injury', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT COUNT(*) AS count FROM AccidentData WHERE INJ_SEV = '3'
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/fatal-injury', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT COUNT(*) AS count FROM AccidentData WHERE INJ_SEV = '4'
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/age-groups', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT 
                CASE 
                    WHEN AGE BETWEEN 0 AND 20 THEN '0-20'
                    WHEN AGE BETWEEN 21 AND 40 THEN '21-40'
                    WHEN AGE BETWEEN 41 AND 60 THEN '41-60'
                    WHEN AGE BETWEEN 61 AND 80 THEN '61-80'
                    WHEN AGE > 80 THEN '81+'
                    ELSE 'Unknown'
                END AS age_group,
                COUNT(*) AS count
            FROM AccidentData
            GROUP BY 
                CASE 
                    WHEN AGE BETWEEN 0 AND 20 THEN '0-20'
                    WHEN AGE BETWEEN 21 AND 40 THEN '21-40'
                    WHEN AGE BETWEEN 41 AND 60 THEN '41-60'
                    WHEN AGE BETWEEN 61 AND 80 THEN '61-80'
                    WHEN AGE > 80 THEN '81+'
                    ELSE 'Unknown'
                END
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get Gender Distribution
router.get('/gender-distribution', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT gender, COUNT(*) AS count
            FROM AccidentData
            GROUP BY gender
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/injury-severity', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT INJ_SEV, COUNT(*) AS count
            FROM AccidentData
            GROUP BY INJ_SEV
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get('/statewise-accidents', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT CDL_STAT, COUNT(*) AS count
            FROM AccidentData
            GROUP BY CDL_STAT
            ORDER BY count DESC
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/region-distribution', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT REGION, COUNT(*) AS count
            FROM AccidentData
            GROUP BY REGION
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/race-distribution', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT RACE, COUNT(*) AS count
            FROM AccidentData
            GROUP BY RACE
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/person-type-distribution', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT PER_TYP, COUNT(*) AS count
            FROM AccidentData
            GROUP BY PER_TYP
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/max-severity-distribution', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT MAX_SEV, COUNT(*) AS count
            FROM AccidentData
            GROUP BY MAX_SEV
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get('/dwi-stats', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT DRINKING, COUNT(*) AS count
            FROM AccidentData
            GROUP BY DRINKING
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
router.get('/drug-stats', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT DRUGS, COUNT(*) AS count
            FROM AccidentData
            GROUP BY DRUGS
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.get('/yearly-accidents', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT year, COUNT(*) AS count
            FROM AccidentData
            GROUP BY year
            ORDER BY year

        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/vehicle-type-count', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT BODY_TYP, COUNT(*) AS count
            FROM AccidentData
            GROUP BY BODY_TYP
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/fatal-accidents', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT COUNT(*) AS fatal_count
            FROM AccidentData
            WHERE fatalities > 0
        `);
        res.json(result.recordset[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/time-of-day-distribution', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT 
                CASE 
                    WHEN HOUR BETWEEN 6 AND 18 THEN 'Day'
                    ELSE 'Night'
                END AS time_of_day,
                COUNT(*) AS count
            FROM AccidentData
            GROUP BY 
                CASE 
                    WHEN HOUR BETWEEN 6 AND 18 THEN 'Day'
                    ELSE 'Night'
                END
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.get('/weather-distribution', async (req, res) => {
    await poolConnect;
    try {
        const result = await pool.request().query(`
            SELECT WEATHER, COUNT(*) AS count
            FROM AccidentData
            GROUP BY WEATHER
        `);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});
// Driver Factors
router.get('/driver-factor', async (req, res) => {
  await poolConnect;
  try {
    const result = await pool.request().query(`
      SELECT DR_SF1, COUNT(*) AS count
      FROM AccidentData
      GROUP BY DR_SF1
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Vehicle Deformation
router.get('/deformation', async (req, res) => {
  await poolConnect;
  try {
    const result = await pool.request().query(`
      SELECT DEFORMED, COUNT(*) AS count
      FROM AccidentData
      GROUP BY DEFORMED
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Marital Status
router.get('/marital-status', async (req, res) => {
  await poolConnect;
  try {
    const result = await pool.request().query(`
      SELECT MARITAL, COUNT(*) AS count
      FROM AccidentData
      GROUP BY MARITAL
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/hit-run', async (req, res) => {
  await poolConnect;
  try {
    const result = await pool.request().query(`
      SELECT HIT_RUN, COUNT(*) AS count
        FROM AccidentData
        GROUP BY HIT_RUN
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});



// Add more endpoints here like DWI stats, state-wise analysis, etc.

module.exports = router;
