import React,{ useState, useEffect} from 'react';
import './App.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
const medicine_data = {
  "Headache.": ["Paracetamol", "Ibuprofen", "Aspirin"],
  "Fever.": ["Paracetamol", "Ibuprofen", "Aspirin"],
  "cough": ["Dextromethorphan", "Guaifenesin", "Phenylephrine"],
  "sore throat": ["Chloraseptic", "Difflam Lozenges", "Cepacol"],
  "stomach ache": ["Pepto-Bismol", "Tums", "Imodium"],
  "runny nose": ["Loratadine", "Cetirizine", "Pseudoephedrine"],
  "allergy": ["Loratadine", "Cetirizine", "Fexofenadine"],
  "back pain": ["Ibuprofen", "Naproxen", "Diclofenac"],
  "insomnia": ["Melatonin", "Diphenhydramine", "Zolpidem"],
  "indigestion": ["Ranitidine", "Omeprazole", "Antacids"],
  "diarrhea": ["Loperamide", "Bismuth Subsalicylate", "Diphenoxylate"],
  "constipation": ["Psyllium Husk", "Docusate Sodium", "Bisacodyl"],
  "sunburn": ["Aloe Vera Gel", "Hydrocortisone Cream", "Ibuprofen"],
  "earache": ["Ibuprofen", "Acetaminophen", "Ear Drops"],
  "migraine": ["Sumatriptan", "Naproxen", "Propranolol"],
  "asthma": ["Albuterol Inhaler", "Fluticasone", "Montelukast"],
  "insect bite": ["Hydrocortisone Cream", "Antihistamine", "Calamine Lotion"],
  "eye irritation": ["Artificial Tears", "Antihistamine Eye Drops", "Cromolyn Sodium Eye Drops"],
  "nausea": ["Ondansetron", "Dimenhydrinate", "Ginger Tablets"],
  "motion sickness": ["Scopolamine", "Dimenhydrinate", "Meclizine"],
  "toothache": ["Ibuprofen", "Acetaminophen", "Orajel"],
  "muscle pain": ["Ibuprofen", "Naproxen", "Muscle Relaxants"],
  "hives": ["Cetirizine", "Diphenhydramine", "Fexofenadine"],
  "canker sore": ["Benzocaine Gel", "Hydrogen Peroxide Rinse", "Prescription Steroid Paste"],
  "acid reflux": ["Omeprazole", "Ranitidine", "Antacids"],
  "hay fever": ["Loratadine", "Cetirizine", "Nasal Corticosteroids"],
  "joint pain": ["Acetaminophen", "Naproxen", "Glucosamine"],
  "rash": ["Hydrocortisone Cream", "Calamine Lotion", "Antihistamine"],
  "fungal infection": ["Clotrimazole", "Terbinafine", "Miconazole"],
  "bladder infection": ["Ciprofloxacin", "Trimethoprim/sulfamethoxazole", "Nitrofurantoin"],
  "sore muscles": ["Topical Muscle Creams", "Epsom Salt Bath", "Over-the-counter Pain Relievers"],
  "heartburn": ["Esomeprazole", "Famotidine", "Alginic Acid"],
  "conjunctivitis": ["Antihistamine Eye Drops", "Artificial Tears", "Prescription Antibiotic Eye Drops"],
  "mouth ulcers": ["Benzocaine Gel", "Hydrogen Peroxide Rinse", "Prescription Steroid Paste"],
  "stress or anxiety": ["Alprazolam", "Sertraline", "Cognitive Behavioral Therapy"],
  "head congestion": ["Pseudoephedrine", "Nasal Saline Spray", "Antihistamines"],
  "stomach ulcers": ["Omeprazole", "Ranitidine", "Sucralfate"],
  "nasal allergies": ["Intranasal Corticosteroids", "Antihistamines", "Cromolyn Sodium Nasal Spray"],
  "menstrual cramps": ["Ibuprofen", "Naproxen", "Acetaminophen"],
  "chest congestion": ["Guaifenesin"],
  "blister": ["Hydrocolloid Bandages", "Antibiotic Ointment", "Pain Relievers"],
  "poison ivy/oak/sumac rash": ["Calamine Lotion", "Hydrocortisone Cream", "Antihistamines"],
  "sunburn": ["Aloe Vera Gel", "Hydrocortisone Cream", "Ibuprofen"],
  "dry cough": ["Dextromethorphan", "Honey", "Throat Lozenges"],
  "strep throat": ["Antibiotics (e.g., Penicillin, Amoxicillin)", "Pain Relievers", "Throat Lozenges"],
  "hay fever": ["Loratadine", "Cetirizine", "Nasal Corticosteroids"],
  "pink eye (conjunctivitis)": ["Prescription Antibiotic Eye Drops", "Artificial Tears", "Warm Compress"],
  "poisoning": ["Call Poison Control", "Activated Charcoal (if instructed)", "Medical Care"],
  "sprained ankle": ["Rest and Elevation", "Cold Compress", "Over-the-Counter Pain Relievers"],
  "pneumonia": ["Antibiotics (prescription required)", "Cough Medicine", "Rest and Hydration"],
  "mild hypothermia": ["Warm, dry clothing", "Warm beverages", "Seek medical attention"],
  "depression": ["Antidepressants (prescription required)", "Therapy", "Support Groups"],
  "anxiety disorder": ["Anti-anxiety Medication (prescription required)", "Counseling", "Relaxation Techniques"],
  "migraine": ["Sumatriptan", "Naproxen", "Propranolol"],
  "nausea and vomiting": ["Ondansetron", "Dimenhydrinate", "Ginger Tablets"],
  "food poisoning": ["Rehydration (Oral Rehydration Solution)", "Antidiarrheal Medications", "Rest"],
  "swimmer's ear": ["Acetic Acid Ear Drops", "Prescription Antibiotic Ear Drops", "Keep Ear Dry"],
  "eczema": ["Topical Corticosteroids", "Emollients (Moisturizers)", "Antihistamines"],
  "mild hypothermia": ["Warm, dry clothing", "Warm beverages", "Seek medical attention"],
  "depression": ["Antidepressants (prescription required)", "Therapy", "Support Groups"],
  "anxiety disorder": ["Anti-anxiety Medication (prescription required)", "Counseling", "Relaxation Techniques"],
  "migraine": ["Sumatriptan", "Naproxen", "Propranolol"],
  "nausea and vomiting": ["Ondansetron", "Dimenhydrinate", "Ginger Tablets"],
  "food poisoning": ["Rehydration (Oral Rehydration Solution)", "Antidiarrheal Medications", "Rest"],
  "swimmer's ear": ["Acetic Acid Ear Drops", "Prescription Antibiotic Ear Drops", "Keep Ear Dry"],
  "eczema": ["Topical Corticosteroids", "Emollients (Moisturizers)", "Antihistamines"],
  "tooth abscess": ["Antibiotics (prescription required)", "Root Canal", "Pain Relievers"],
  "gastroenteritis": ["Rehydration (Oral Rehydration Solution)", "Anti-nausea Medications", "Bland Diet"],
  "kidney stones": ["Pain Medications", "Alpha Blockers", "Fluids and Diet Changes"],
  "heat exhaustion": ["Cooling Down", "Rehydration", "Rest"],
  "poisonous spider or snake bite": ["Antivenom (if applicable)", "Immobilization", "Seek Medical Attention"],
  "peptic ulcer": ["Antibiotics (if H. pylori infection)", "Proton Pump Inhibitors", "Antacids"],
  "cystitis": ["Antibiotics (prescription required)", "Pain Relievers", "Hydration"],
  "menopause symptoms": ["Hormone Replacement Therapy (HRT)", "Alternative Therapies", "Lifestyle Changes"],
  "pulled muscle": ["Rest", "Ice and Compression", "Pain Relievers"],
  "shin splints": ["Rest", "Ice", "Anti-Inflammatory Medications"],
  "carpal tunnel syndrome": ["Wrist Splints", "Physical Therapy", "Anti-Inflammatory Medications"],
  "tonsillitis": ["Antibiotics (prescription required)", "Pain Relievers", "Throat Lozenges"],
  "swollen lymph nodes": ["Treatment of Underlying Cause", "Pain Relievers", "Warm Compress"],
  "fibromyalgia": ["Pain Medications", "Physical Therapy", "Lifestyle Modifications"],
  "tennis elbow": ["Rest", "Physical Therapy", "Pain Relievers"],
  "sprained wrist": ["Rest", "Ice", "Anti-Inflammatory Medications"],
  "shingles": ["Antiviral Medications", "Pain Relievers", "Topical Creams"],
  "athlete's foot": ["Antifungal Creams", "Powders", "Hygiene Measures"],
  "ringworm": ["Antifungal Creams", "Oral Antifungal Medications", "Hygiene Measures"],
  "malaria": ["Antimalarial Medications", "Preventive Measures", "Seek Medical Attention"],
  "appendicitis": ["Surgery (Appendectomy)", "Antibiotics", "Hospitalization"],
  "rosacea": ["Topical Antibiotics", "Oral Antibiotics", "Lifestyle Changes"],
  "ulcerative colitis": ["Anti-Inflammatory Medications", "Immunosuppressants", "Dietary Changes"],
  "gout": ["Anti-Inflammatory Medications", "Colchicine", "Dietary Changes"],
  "tendonitis": ["Rest", "Physical Therapy", "Anti-Inflammatory Medications"],
  "bursitis": ["Rest", "Anti-Inflammatory Medications", "Physical Therapy"],
  "diverticulitis": ["Antibiotics (prescription required)", "Clear Liquid Diet", "Hospitalization"],
  "jaundice": ["Treatment of Underlying Cause", "Symptomatic Treatment", "Hospitalization"],
  "melasma": ["Topical Creams", "Chemical Peels", "Sun Protection"],
  "mumps": ["Supportive Care", "Pain Relievers", "Isolation"],
  "varicose veins": ["Compression Stockings", "Lifestyle Changes", "Surgical Procedures"],
  "thrombophlebitis": ["Blood Thinners", "Warm Compress", "Elevation"],
  "obsessive-compulsive disorder (OCD)": ["Cognitive-Behavioral Therapy (CBT)", "Antidepressants",
                                          "Exposure and Response Prevention (ERP)"],
  "social anxiety disorder": ["Cognitive-Behavioral Therapy (CBT)", "Exposure Therapy", "Antidepressants"],
  "panic disorder": ["Cognitive-Behavioral Therapy (CBT)", "Antidepressants", "Anti-Anxiety Medications"],
  "obsessive-compulsive disorder (OCD)": ["Cognitive-Behavioral Therapy (CBT)", "Antidepressants",
                                          "Exposure and Response Prevention (ERP)"],
  "bipolar disorder": ["Mood Stabilizers", "Antipsychotic Medications", "Psychotherapy"],
  "schizophrenia": ["Antipsychotic Medications", "Psychotherapy", "Rehabilitation Programs"],
  "borderline personality disorder": ["Dialectical Behavior Therapy (DBT)", "Psychotherapy",
                                      "Medications (for specific symptoms)"],
  "alcohol use disorder": ["Counseling", "Support Groups", "Medications (e.g., Disulfiram, Naltrexone)"],
  "opiate addiction": ["Methadone Maintenance Treatment", "Buprenorphine", "Behavioral Therapy"],
  "eating disorders (e.g., anorexia, bulimia)": ["Nutritional Counseling", "Psychotherapy",
                                                 "Medications (in some cases)"],
  "lupus": ["Anti-Inflammatory Medications", "Immunosuppressants", "Lifestyle Modifications"],
  "multiple sclerosis": ["Disease-Modifying Therapies", "Symptomatic Treatment", "Physical Therapy"],
  "fibroids": ["Medications", "Myomectomy", "Hysterectomy"],
  "endometriosis": ["Pain Medications", "Hormonal Therapy", "Laparoscopic Surgery"],
  "polycystic ovary syndrome (PCOS)": ["Lifestyle Modifications", "Oral Contraceptives", "Metformin"],
  "herniated disc": ["Rest", "Physical Therapy", "Pain Medications"],
  "osteoarthritis": ["Pain Medications", "Physical Therapy", "Surgery (in severe cases)"],
  "rheumatoid arthritis": ["Disease-Modifying Antirheumatic Drugs (DMARDs)", "Biologic Agents", "Physical Therapy"],
  "cerebral palsy": ["Physical Therapy", "Orthopedic Surgery", "Medic"]
}


const App = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    stopListening,
  } = useSpeechRecognition();
  const [speechSynthesis, setSpeechSynthesis] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [searchResults, setSearchResults] = useState({}); // State for search results

  useEffect(() => {
    if ('speechSynthesis' in window) {
      setSpeechSynthesis(window.speechSynthesis);
    }

    if (!listening) {
      handleSearch(searchTerm); // Call handleSearch when listening changes
    }
  }, [listening, searchTerm]);

  const handleSearch = (term) => {
    if (!term) {
      setSearchResults({});
      return;
    }

    const words = term.split(' ');
    const result = {};

    for (const word of words) {
      if (medicine_data[word]) {
        result[word] = medicine_data[word];
      }
    }

    setSearchResults(result);
    speakResults(result);
  };

  const speakResults = (results) => {
    if (!speechSynthesis) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance();

    if (Object.keys(results).length === 0) {
      utterance.text = 'No results found.';
    } else {
      utterance.text = 'Here are the results:';
      for (const word in results) {
        utterance.text += ` For ${word}, the medicines are: ${results[word].join(', ')}.`;
      }
    }

    speechSynthesis.speak(utterance);
  };

  return (
    <div id="app-container">
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term
      />
      <button onClick={() => handleSearch(searchTerm)}>Search</button>
      <p>{transcript}</p>

      {/* Display search results */}
      <div>
        {Object.keys(searchResults).length === 0 ? (
          <p>No results found.</p>
        ) : (
          <div>
            <p>Search Results:</p>
            <ul>
              {Object.keys(searchResults).map((word) => (
                <li key={word}>
                  For {word}, the medicines are: {searchResults[word].join(', ')}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;