import express from 'express';
import agendaService from '../services/agenda.service.js';
import flowService from '../services/flow.service.js';
import authMiddleware from '../middleware/auth.middleware.js'; 

const router = express.Router();


router.post('/send-email-one-hour', authMiddleware, async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    if (!to || !subject || !body) {
      return res.status(400).json({ message: 'Recipient, subject, and body are required' });
    }
   
    const scheduledTime = new Date(Date.now() + 60 * 60 * 1000); 
    await agendaService.scheduleEmail(scheduledTime, { to, subject, body });

    res.status(200).json({ message: 'Email scheduled for approximately 1 hour from now' });
  } catch (error) {
    console.error('Error scheduling email:', error);
    res.status(500).json({ message: 'Failed to schedule email', error: error.message });
  }
});



router.post('/', authMiddleware, async (req, res) => {
  try {
    const flowData = req.body; 
    const userId = req.user._id; 

    if (!flowData || !Array.isArray(flowData.nodes) || !Array.isArray(flowData.edges)) {
         return res.status(400).json({ message: 'Invalid flow data format' });
    }

   
    const savedFlow = await flowService.saveFlow(userId, flowData);


    flowService.processFlowAndSchedule(userId, flowData)
        .then(() => console.log(`Flow ${savedFlow._id} processed and jobs scheduled.`))
        .catch(err => console.error(`Error processing flow ${savedFlow._id}:`, err));


    res.status(201).json({ message: 'Flow saved and scheduling started', flowId: savedFlow._id });
  } catch (error) {
    console.error('Error saving flow:', error);
    res.status(500).json({ message: 'Failed to save flow', error: error.message });
  }
});

// Get most recent flow
router.get('/latest', authMiddleware, async (req, res) => {
   try {
     const userId = req.user._id;
     const flow = await flowService.getFlows(userId);
     if (!flow) {
       return res.status(404).json({ message: 'No flow found for this user' });
     }
     res.status(200).json(flow);
   } catch (error) {
     console.error('Error fetching flow:', error);
     res.status(500).json({ message: 'Failed to fetch flow', error: error.message });
   }
});


export default router;