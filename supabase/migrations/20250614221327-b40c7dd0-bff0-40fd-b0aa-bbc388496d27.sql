
-- Create policies to allow reading data from esg_scores table
CREATE POLICY "Allow public read access to esg_scores" 
  ON public.esg_scores 
  FOR SELECT 
  USING (true);

-- Create policies to allow reading data from environmental_data table  
CREATE POLICY "Allow public read access to environmental_data" 
  ON public.environmental_data 
  FOR SELECT 
  USING (true);

-- Create policies to allow reading data from social_metrics table
CREATE POLICY "Allow public read access to social_metrics" 
  ON public.social_metrics 
  FOR SELECT 
  USING (true);

-- Create policies to allow reading data from governance_metrics table
CREATE POLICY "Allow public read access to governance_metrics" 
  ON public.governance_metrics 
  FOR SELECT 
  USING (true);

-- Create policies to allow reading data from esg_milestones table
CREATE POLICY "Allow public read access to esg_milestones" 
  ON public.esg_milestones 
  FOR SELECT 
  USING (true);
