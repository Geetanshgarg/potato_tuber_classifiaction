"use client";

import { createContext, useState, useEffect, useContext } from "react";

// Create translations object with all supported languages
const translationsData = {
  English: {
    takePhoto: "Take Photo",
    upload: "Upload",
    myPlants: "My Plants",
    guide: "Guide",
    recentActivity: "Recent Activity",
    healthyPotato: "Healthy Potato Plant",
    earlyBlight: "Early Blight Detected",
    watchedGuide: "Watched Treatment Guide",
    scanPlant: "Scan Your Plant",
    photoInstructions: "Take a clear photo of your potato plant leaf",
    focusInstructions: "Make sure the leaf is well-lit and in focus",
    uploadFromGallery: "Upload from Gallery",
    plantHealthResults: "Plant Health Results",
    moderateSeverity: "Moderate severity",
    recommendedActions: "Recommended Actions:",
    removeLeaves: "Remove and destroy affected leaves",
    applyFungicide: "Apply copper-based fungicide",
    improveCirculation: "Improve air circulation around plants",
    listenRecommendations: "Listen to Recommendations",
    watchVideo: "Watch Treatment Video",
    selectImage: "Select Image",
    startCamera: "Start Camera",
    retryCamera : "Retry Camera",
    camera: "Camera",
    analyze : "Analyze",
    reset: "Reset",
    saveToPlants: "Save to My Plants",
    learnImprove: "Learn & Improve",
    watchVideos: "Watch videos to learn better farming techniques",
    treatingBlight: "Treating Early Blight in Potato Plants",
    viewAllVideos: "View All Videos",
    trackMonitor: "Track and monitor your crops",
    potatoField: "Potato Field",
    daysAgo: "days ago",
    viewTreatment: "View Treatment Plan",
    addNewPlant: "Add New Plant",
    selectLanguage: "Select Language",
    home: "Home",
    scan: "Scan",
    pleaseWait: "Please wait...",
    learn: "Learn",
    unknownCondition: "Unknown condition",
    noPlantsYet: "No plants yet. Start by scanning a plant!",
    scanToAddPlants: "Scan to add plants",
    detected: "detected",
    noRecentActivity: "No recent activity yet. Start by scanning a plant!",
    guide: "Guide",
    scanAnotherPlant: "Scan Another Plant",
    // Recommendation translations
    recommendHealthy1: "Continue regular watering schedule",
    recommendHealthy2: "Apply balanced fertilizer as needed",
    recommendHealthy3: "Monitor for any changes in plant health",
    recommendHealthy4: "Ensure proper ventilation in storage areas",

    recommendEarlyBlight1: "Remove and destroy affected leaves",
    recommendEarlyBlight2: "Apply copper-based fungicide",
    recommendEarlyBlight3: "Improve air circulation around plants",
    recommendEarlyBlight4: "Avoid overhead irrigation to prevent leaf wetness",

    recommendLateBlight1:
      "Remove and destroy all infected plant material immediately",
    recommendLateBlight2:
      "Apply fungicide with active ingredients specific for late blight",
    recommendLateBlight3: "Increase plant spacing for better air circulation",
    recommendLateBlight4:
      "Harvest tubers during dry weather to prevent infection",

    recommendBlackScurf1: "Use certified disease-free seed tubers",
    recommendBlackScurf2: "Practice crop rotation with 3-4 year intervals",
    recommendBlackScurf3: "Avoid harvesting in cold, wet conditions",
    recommendBlackScurf4:
      "Store tubers at proper temperature (7-10°C) and humidity",

    recommendCommonScab1: "Maintain soil pH below 5.5 where possible",
    recommendCommonScab2:
      "Ensure consistent soil moisture during tuber formation",
    recommendCommonScab3: "Use resistant varieties for future plantings",
    recommendCommonScab4: "Apply organic matter to improve soil structure",

    recommendFungal1: "Apply appropriate fungicide treatment",
    recommendFungal2: "Reduce humidity around plants and in storage",
    recommendFungal3: "Avoid overhead watering",
    recommendFungal4: "Remove plant debris after harvest",

    recommendInsect1: "Apply appropriate organic or chemical insecticide",
    recommendInsect2: "Introduce beneficial insects if applicable",
    recommendInsect3: "Remove severely damaged plant parts",
    recommendInsect4: "Use sticky traps to monitor insect populations",

    recommendViral1: "Remove infected plants to prevent spread",
    recommendViral2: "Control insect vectors with appropriate insecticides",
    recommendViral3: "Sanitize tools and equipment",
    recommendViral4:
      "Use certified virus-free seed potatoes for future plantings",

    recommendBacterial1: "Remove and destroy infected plants",
    recommendBacterial2: "Apply copper-based bactericides",
    recommendBacterial3: "Avoid working with plants when wet",
    recommendBacterial4: "Practice crop rotation in future plantings",

    recommendDefault1: "Consult with an agricultural expert",
    recommendDefault2: "Take multiple photos from different angles",
    recommendDefault3: "Monitor plant for any changes in symptoms",
    recommendDefault4: "Send samples to a lab for detailed analysis",

    listenRecommendations: "Listen to Recommendations",
  },
  Hindi: {
    takePhoto: "फोटो लें",
    upload: "अपलोड करें",
    myPlants: "मेरे पौधे",
    guide: "गाइड",
    selectImage: "छवि चुनें",
    startCamera: "कैमरा शुरू करें",
    recentActivity: "हाल की गतिविधि",
    healthyPotato: "स्वस्थ आलू का पौधा",
    earlyBlight: "अर्ली ब्लाइट का पता चला",
    watchedGuide: "उपचार गाइड देखी",
    scanPlant: "अपने पौधे को स्कैन करें",
    startCamera: "कैमरा शुरू करें",
    retryCamera : "कैमरा पुनः प्रयास करें",
    photoInstructions: "आलू के पत्ते की स्पष्ट तस्वीर लें",
    focusInstructions:
      "सुनिश्चित करें कि पत्ता अच्छी तरह से रोशन और फोकस में है",
    noPlantsYet: "अभी तक कोई पौधा नहीं। पौधा स्कैन करके शुरू करें!",
    scanToAddPlants: "पौधे जोड़ने के लिए स्कैन करें",
    scanAnotherPlant : "एक और पौधा स्कैन करें",
    uploadFromGallery: "गैलरी से अपलोड करें",
    plantHealthResults: "पौधे के स्वास्थ्य के परिणाम",
    moderateSeverity: "मध्यम गंभीरता",
    recommendedActions: "अनुशंसित कार्रवाई:",
    pleaseWait  : "कृपया प्रतीक्षा करें...",
    removeLeaves: "प्रभावित पत्तियों को हटाएं और नष्ट करें",
    applyFungicide: "कॉपर-आधारित फफूंदनाशक लगाएं",
    improveCirculation: "पौधों के आसपास हवा का संचार बेहतर बनाएं",
    listenRecommendations: "सिफारिशें सुनें",
    watchVideo: "उपचार वीडियो देखें",
    saveToPlants: "मेरे पौधों में सहेजें",
    learnImprove: "सीखें और सुधारें",
    watchVideos: "बेहतर खेती तकनीकों को सीखने के लिए वीडियो देखें",
    treatingBlight: "आलू के पौधों में अर्ली ब्लाइट का उपचार",
    viewAllVideos: "सभी वीडियो देखें",
    trackMonitor: "अपनी फसलों को ट्रैक और मॉनिटर करें",
    potatoField: "आलू का खेत",
    camera: "कैमरा",
    analyze : "विश्लेषण",
    reset: "रीसेट",
    daysAgo: "दिन पहले",
    viewTreatment: "उपचार योजना देखें",
    addNewPlant: "नया पौधा जोड़ें",
    selectLanguage: "भाषा चुनें",
    home: "होम",
    scan: "स्कैन",
    selectImage: "छवि चुनें",
    learn: "सीखें",
    unknownCondition: "अज्ञात स्थिति",
    detected: "का पता चला",
    noRecentActivity:
      "अभी तक कोई हालिया गतिविधि नहीं। पौधे को स्कैन करके शुरू करें!",
    guide: "गाइड",
    // Recommendation translations
    recommendHealthy1: "नियमित रूप से पानी देते रहें",
    recommendHealthy2: "आवश्यकतानुसार संतुलित उर्वरक लगाएं",
    recommendHealthy3: "पौधे के स्वास्थ्य में किसी भी बदलाव पर नज़र रखें",
    recommendHealthy4: "भंडारण क्षेत्रों में उचित वेंटिलेशन सुनिश्चित करें",

    recommendEarlyBlight1: "प्रभावित पत्तियों को हटाएं और नष्ट करें",
    recommendEarlyBlight2: "कॉपर-आधारित फफूंदनाशक लगाएं",
    recommendEarlyBlight3: "पौधों के आसपास हवा का संचार बेहतर बनाएं",
    recommendEarlyBlight4:
      "पत्तियों को गीला होने से बचाने के लिए ऊपर से सिंचाई न करें",

    recommendLateBlight1:
      "सभी संक्रमित पौध सामग्री को तुरंत हटा दें और नष्ट करें",
    recommendLateBlight2:
      "लेट ब्लाइट के लिए विशिष्ट सक्रिय तत्वों के साथ फफूंदनाशक लगाएं",
    recommendLateBlight3:
      "बेहतर हवा परिसंचरण के लिए पौधों के बीच की दूरी बढ़ाएं",
    recommendLateBlight4:
      "संक्रमण को रोकने के लिए सूखे मौसम में कंदों की कटाई करें",

    recommendBlackScurf1: "प्रमाणित रोग-मुक्त बीज कंदों का उपयोग करें",
    recommendBlackScurf2: "3-4 साल के अंतराल के साथ फसल चक्र का अभ्यास करें",
    recommendBlackScurf3: "ठंडे, गीले परिस्थितियों में कटाई से बचें",
    recommendBlackScurf4:
      "कंदों को उचित तापमान (7-10°C) और आर्द्रता पर स्टोर करें",

    recommendCommonScab1: "जहां संभव हो मिट्टी का पीएच 5.5 से नीचे रखें",
    recommendCommonScab2:
      "कंद निर्माण के दौरान लगातार मिट्टी की नमी सुनिश्चित करें",
    recommendCommonScab3:
      "भविष्य की बुवाई के लिए प्रतिरोधी किस्मों का उपयोग करें",
    recommendCommonScab4:
      "मिट्टी की संरचना में सुधार के लिए जैविक पदार्थ लगाएं",

    recommendFungal1: "उपयुक्त फफूंदनाशक उपचार लगाएं",
    recommendFungal2: "पौधों और भंडारण में आर्द्रता कम करें",
    recommendFungal3: "ऊपर से पानी देने से बचें",
    recommendFungal4: "कटाई के बाद पौध अवशेष हटा दें",

    recommendInsect1: "उपयुक्त जैविक या रासायनिक कीटनाशक लगाएं",
    recommendInsect2: "यदि लागू हो तो लाभकारी कीड़ों को पेश करें",
    recommendInsect3: "गंभीर रूप से क्षतिग्रस्त पौध भागों को हटा दें",
    recommendInsect4: "कीट आबादी की निगरानी के लिए चिपचिपे जाल का उपयोग करें",

    recommendViral1: "संक्रमण को रोकने के लिए संक्रमित पौधों को हटा दें",
    recommendViral2: "उपयुक्त कीटनाशकों के साथ कीट वाहकों को नियंत्रित करें",
    recommendViral3: "उपकरण और उपकरणों को साफ करें",
    recommendViral4:
      "भविष्य की बुवाई के लिए प्रमाणित वायरस-मुक्त बीज आलू का उपयोग करें",

    recommendBacterial1: "संक्रमित पौधों को हटा दें और नष्ट करें",
    recommendBacterial2: "कॉपर-आधारित जीवाणुनाशक लगाएं",
    recommendBacterial3: "गीले होने पर पौधों के साथ काम करने से बचें",
    recommendBacterial4: "भविष्य की बुवाई में फसल चक्र का अभ्यास करें",

    recommendDefault1: "कृषि विशेषज्ञ से परामर्श करें",
    recommendDefault2: "विभिन्न कोणों से कई तस्वीरें लें",
    recommendDefault3: "लक्षणों में किसी भी बदलाव के लिए पौधे की निगरानी करें",
    recommendDefault4: "विस्तृत विश्लेषण के लिए नमूने प्रयोगशाला में भेजें",

    listenRecommendations: "सिफारिशें सुनें",
  },
  Telugu: {
    takePhoto: "ఫోటో తీయండి",
    upload: "అప్లోడ్ చేయండి",
    myPlants: "నా మొక్కలు",
    guide: "మార్గదర్శి",
    recentActivity: "ఇటీవలి కార్యాచరణ",
    healthyPotato: "ఆరోగ్యకరమైన బంగాళాదుంప మొక్క",
    earlyBlight: "ప్రారంభ బ్లైట్ గుర్తించబడింది",
    watchedGuide: "చికిత్స గైడ్ చూసారు",
    scanPlant: "మీ మొక్కను స్కాన్ చేయండి",
    photoInstructions: "బంగాళాదుంప ఆకు యొక్క స్పష్టమైన ఫోటోను తీయండి",
    focusInstructions: "ఆకు బాగా కనిపించేలా చూసుకోండి",
    uploadFromGallery: "గ్యాలరీ నుండి అప్‌లోడ్ చేయండి",
    plantHealthResults: "మొక్క ఆరోగ్య ఫలితాలు",
    pleaseWait  : "దయచేసి వేచిండి...",
    camera: "కెమెరా",
    analyze : "విశ్లేషించండి",
    reset: "రీసెట్",
    scanAnotherPlant : "మరో మొక్కను స్కాన్ చేయండి",
    startCamera: "కెమెరా ప్రారంభించండి",
    retryCamera : "కెమెరా పునః ప్రయత్నించండి",
    moderateSeverity: "మధ్యస్థ తీవ్రత",
    recommendedActions: "సిఫార్సు చేయబడిన చర్యలు:",
    removeLeaves: "ప్రభావిత ఆకులను తొలగించండి",
    applyFungicide: "కాపర్ ఆధారిత శిలీంద్రనాశిని వాడండి",
    improveCirculation: "మొక్కల చుట్టూ గాలి ప్రసరణను మెరుగుపరచండి",
    listenRecommendations: "సిఫార్సులను వినండి",
    noPlantsYet: "ఇంకా మొక్కలు లేవు. మొక్కను స్కాన్ చేయడం ద్వారా ప్రారంభించండి!",  
    scanToAddPlants: "మొక్కలను జోడించడానికి స్కాన్ చేయండి",
    selectImage: "చిత్రం ఎంచుకోండి",
    watchVideo: "చికిత్స వీడియో చూడండి",
    saveToPlants: "నా మొక్కలలో భద్రపరచండి",
    learnImprove: "నేర్చుకోండి & మెరుగుపరచండి",
    watchVideos: "మెరుగైన వ్యవసాయ పద్ధతులను నేర్చుకోవడానికి వీడియోలు చూడండి",
    treatingBlight: "బంగాళాదుంప మొక్కలలో ప్రారంభ బ్లైట్‌ను చికిత్స చేయడం",
    viewAllVideos: "అన్ని వీడియోలు చూడండి",
    trackMonitor: "మీ పంటలను ట్రాక్ మరియు పర్యవేక్షించండి",
    potatoField: "బంగాళాదుంప పొలం",
    daysAgo: "రోజుల క్రితం",
    viewTreatment: "చికిత్స ప్రణాళికను చూడండి",
    addNewPlant: "కొత్త మొక్కను జోడించండి",
    selectLanguage: "భాష ఎంచుకోండి",
    home: "హోమ్",
    scan: "స్కాన్",
    learn: "నేర్చుకోండి",
    unknownCondition: "తెలియని పరిస్థితి",
    detected: "గుర్తించబడింది",
    noRecentActivity:
      "ఇంకా ఇటీవలి కార్యాచరణ లేదు. మొక్కను స్కాన్ చేయడం ద్వారా ప్రారంభించండి!",
    guide: "మార్గదర్శి",
    recommendHealthy1: "నియమిత నీటిపారుదల షెడ్యూల్‌ను కొనసాగించండి",
    recommendHealthy2: "అవసరమైనప్పుడు సమతుల్య ఎరువులను వర్తింపజేయండి",
    recommendHealthy3: "మొక్క ఆరోగ్యంలో ఏవైనా మార్పులను పరిశీలించండి",
    recommendHealthy4: "నిల్వ ప్రదేశాలలో సరియైన వెంటిలేషన్‌ను నిర్ధారించుకోండి",

    recommendEarlyBlight1: "ప్రభావితమైన ఆకులను తీసివేసి నాశనం చేయండి",
    recommendEarlyBlight2: "కాపర్-ఆధారిత ఫంగైసైడ్‌ను వర్తింపజేయండి",
    recommendEarlyBlight3: "మొక్కల చుట్టూ గాలి ప్రసరణను మెరుగుపరచండి",
    recommendEarlyBlight4:
      "ఆకుల తేమను నివారించడానికి పైనుంచి నీటిపారుదలను నివారించండి",

    recommendLateBlight1:
      "అన్ని ఇన్ఫెక్టెడ్ ప్లాంట్ మెటీరియల్‌ను వెంటనే తీసివేసి నాశనం చేయండి",
    recommendLateBlight2:
      "లేట్ బ్లైట్‌కు ప్రత్యేకమైన యాక్టివ్ ఇంగ్రీడియంట్స్‌తో ఫంగైసైడ్‌ను వర్తింపజేయండి",
    recommendLateBlight3:
      "మెరుగైన గాలి ప్రసరణ కోసం మొక్కల మధ్య దూరాన్ని పెంచండి",
    recommendLateBlight4:
      "ఇన్ఫెక్షన్‌ను నివారించడానికి ఎండబెట్టిన వాతావరణంలో బంగాళాదుంపలను కోత చేయండి",

    recommendBlackScurf1: "వ్యాధి-రహిత విత్తన బంగాళాదుంపలను ఉపయోగించండి",
    recommendBlackScurf2: "3-4 సంవత్సరాల వ్యవధితో పంట మార్పిడిని పాటించండి",
    recommendBlackScurf3: "చల్లని, తేమగల పరిస్థితుల్లో కోత చేయకండి",
    recommendBlackScurf4:
      "బంగాళాదుంపలను 7-10°C ఉష్ణోగ్రత మరియు తేమతో నిల్వ చేయండి",

    recommendCommonScab1:
      "సాధ్యమైనప్పుడు నేల పిహెచ్‌ని 5.5 కంటే తక్కువగా ఉంచండి",
    recommendCommonScab2:
      "బంగాళాదుంప ఏర్పడటంలో నేలలో స్థిరమైన తేమను నిర్ధారించుకోండి",
    recommendCommonScab3: "భవిష్యత్తు నాటడాల కోసం నిరోధక రకాలను ఉపయోగించండి",
    recommendCommonScab4:
      "నేల నిర్మాణాన్ని మెరుగుపరచడానికి సేంద్రీయ పదార్థాలను వర్తింపజేయండి",

    recommendFungal1: "సరైన ఫంగైసైడ్ చికిత్సను వర్తింపజేయండి",
    recommendFungal2: "మొక్కల చుట్టూ మరియు నిల్వలో తేమను తగ్గించండి",
    recommendFungal3: "పైనుంచి నీటిపారుదలను నివారించండి",
    recommendFungal4: "కోత తర్వాత మొక్కల అవశేషాలను తీసివేయండి",

    recommendInsect1: "సరైన సేంద్రీయ లేదా రసాయన కీటకనాశకాలను వర్తింపజేయండి",
    recommendInsect2:
      "వర్తించే సందర్భాల్లో ప్రయోజనకరమైన కీటకాలను ప్రవేశపెట్టండి",
    recommendInsect3: "తీవ్రంగా దెబ్బతిన్న మొక్కల భాగాలను తీసివేయండి",
    recommendInsect4:
      "కీటక జనాభాను పర్యవేక్షించడానికి అంటుకునే ట్రాప్‌లను ఉపయోగించండి",

    recommendViral1:
      "వ్యాప్తిని నిరోధించడానికి ఇన్ఫెక్టెడ్ మొక్కలను తీసివేయండి",
    recommendViral2: "సరైన కీటకనాశకాలతో కీటక వెక్టర్‌లను నియంత్రించండి",
    recommendViral3: "సాధనాలు మరియు పరికరాలను శుభ్రం చేయండి",
    recommendViral4:
      "భవిష్యత్తు విత్తన బంగాళాదుంపల కోసం వైరస్-రహిత విత్తన బంగాళాదుంపలను ఉపయోగించండి",

    recommendBacterial1: "ఇన్ఫెక్టెడ్ మొక్కలను తీసివేసి నాశనం చేయండి",
    recommendBacterial2: "కాపర్-ఆధారిత బాక్టీరిసైడ్‌లను వర్తింపజేయండి",
    recommendBacterial3: "మొక్కలు తేమగా ఉన్నప్పుడు వాటితో పని చేయకండి",
    recommendBacterial4: "భవిష్యత్తు పంటలలో పంట మార్పిడిని పాటించండి",

    recommendDefault1: "వ్యవసాయ నిపుణుడితో సంప్రదించండి",
    recommendDefault2: "వేర్వేరు కోణాల నుండి బహుళ ఫొటోలు తీసుకోండి",
    recommendDefault3: "మొక్కలో ఏవైనా లక్షణాలలో మార్పులను పరిశీలించండి",
    recommendDefault4: "వివరణాత్మక విశ్లేషణ కోసం నమూనాలను ప్రయోగశాలకు పంపండి",

    listenRecommendations: "సిఫార్సులను వినండి",
  },
  Marathi: {
    takePhoto: "फोटो काढा",
    upload: "अपलोड करा",
    myPlants: "माझी रोपे",
    startCamera: "कॅमेरा सुरू करा",
    reset: "रीसेट करा",
    retryCamera: "कॅमेरा पुन्हा प्रयत्न करा",
    selectImage: "छवि निवडा",
    guide: "मार्गदर्शक",
    scanAnotherPlant: "दुसरी रोप स्कॅन करा",
    recentActivity: "अलीकडील क्रियाकलाप",
    healthyPotato: "निरोगी बटाटा रोप",
    earlyBlight: "अर्ली ब्लाइट आढळले",
    watchedGuide: "उपचार मार्गदर्शक पाहिला",
    scanPlant: "आपल्या रोपाचे स्कॅन करा",
    photoInstructions: "बटाट्याच्या पानाचा स्पष्ट फोटो काढा",
    focusInstructions: "पान चांगले प्रकाशित आणि फोकस मध्ये असल्याची खात्री करा",
    uploadFromGallery: "गॅलरीतून अपलोड करा",
    plantHealthResults: "रोपाच्या आरोग्याचे परिणाम",
    moderateSeverity: "मध्यम तीव्रता",
    noPlantsYet: "अद्याप कोणतीही रोप नाही. रोप स्कॅन करून सुरू करा!",
    scanToAddPlants: "रोप जोडण्यासाठी स्कॅन करा",
    recommendedActions: "शिफारस केलेल्या क्रिया:",
    removeLeaves: "प्रभावित पाने काढून टाका आणि नष्ट करा",
    applyFungicide: "कॉपर-आधारित बुरशीनाशक लावा",
    improveCirculation: "रोपांच्या आसपास हवेची वाहतूक सुधारा",
    listenRecommendations: "शिफारसी ऐका",
    pleaseWait: "कृपया प्रतीक्षा करा...",
    watchVideo: "उपचार व्हिडिओ पहा",
    saveToPlants: "माझ्या रोपांमध्ये जतन करा",
    camera: "कॅमेरा",
    analyze: "विश्लेषण करा",
    reset: "रीसेट करा",
    learnImprove: "शिका आणि सुधारा",
    watchVideos: "चांगल्या शेती तंत्रांबद्दल शिकण्यासाठी व्हिडिओ पहा",
    treatingBlight: "बटाट्याच्या रोपांमध्ये अर्ली ब्लाइटवर उपचार करणे",
    viewAllVideos: "सर्व व्हिडिओ पहा",
    trackMonitor: "आपल्या पिकांवर नजर ठेवा",
    potatoField: "बटाटा शेत",
    daysAgo: "दिवसांपूर्वी",
    viewTreatment: "उपचार योजना पहा",
    addNewPlant: "नवीन रोप जोडा",
    selectLanguage: "भाषा निवडा",
    home: "होम",
    scan: "स्कॅन",
    learn: "शिका",
    unknownCondition: "अज्ञात स्थिती",
    detected: "आढळले",
    noRecentActivity:
      "अद्याप कोणतीही अलीकडील क्रियाकलाप नाही. रोप स्कॅन करून सुरू करा!",
    guide: "मार्गदर्शक",
    recommendHealthy1: "नियमित पाण्याची व्यवस्था चालू ठेवा",
    recommendHealthy2: "गरज पडल्यास संतुलित खत वापरा",
    recommendHealthy3: "झाडाच्या आरोग्यातील कोणत्याही बदलांवर लक्ष ठेवा",
    recommendHealthy4: "साठवणीच्या जागेत योग्य वायुवीजन सुनिश्चित करा",

    recommendEarlyBlight1: "प्रभावित झालेली पाने काढून टाका आणि नष्ट करा",
    recommendEarlyBlight2: "कॉपर-आधारित फंगीसाईड वापरा",
    recommendEarlyBlight3: "झाडाभोवती हवेचा प्रवाह सुधारा",
    recommendEarlyBlight4: "पानांची ओलावा टाळण्यासाठी वरून पाण्याचा फवारा टाळा",

    recommendLateBlight1:
      "सर्व संक्रमित झाडांची सामग्री त्वरित काढून टाका आणि नष्ट करा",
    recommendLateBlight2:
      "लेट ब्लाइटसाठी विशिष्ट सक्रिय घटकांसह फंगीसाईड वापरा",
    recommendLateBlight3:
      "चांगला हवेचा प्रवाह मिळावा म्हणून झाडांमधील अंतर वाढवा",
    recommendLateBlight4:
      "संक्रमण टाळण्यासाठी कोरड्या हवामानात बटाट्यांची काढणी करा",

    recommendBlackScurf1: "रोगमुक्त बियाणे बटाट्यांचा वापर करा",
    recommendBlackScurf2: "3-4 वर्षांच्या अंतराने पिकांची फेरपालट करा",
    recommendBlackScurf3: "थंड आणि ओल्या परिस्थितीत काढणी करू नका",
    recommendBlackScurf4: "बटाट्यांची साठवण 7-10°C तापमान आणि आर्द्रतेसह करा",

    recommendCommonScab1: "जेथे शक्य असेल तेथे जमिनीचा pH 5.5 पेक्षा कमी ठेवा",
    recommendCommonScab2:
      "बटाट्यांच्या निर्मितीच्या काळात जमिनीत स्थिर ओलावा राखा",
    recommendCommonScab3: "भविष्यातील लागवडीसाठी प्रतिकारक्षम जाती वापरा",
    recommendCommonScab4: "जमिनीची रचना सुधारण्यासाठी जैविक पदार्थ वापरा",

    recommendFungal1: "योग्य फंगीसाईड उपचार वापरा",
    recommendFungal2: "झाडाभोवती आणि साठवणीतील आर्द्रता कमी करा",
    recommendFungal3: "वरून पाण्याचा फवारा टाळा",
    recommendFungal4: "काढणीनंतर झाडांची अवशेषे काढून टाका",

    recommendInsect1: "योग्य जैविक किंवा रासायनिक कीटकनाशक वापरा",
    recommendInsect2:
      "लागू असलेल्या परिस्थितीत फायदेशीर कीटकांना प्रोत्साहन द्या",
    recommendInsect3: "जोरात नुकसान झालेल्या झाडांच्या भागांना काढून टाका",
    recommendInsect4:
      "कीटक लोकसंख्या नियंत्रित करण्यासाठी चिकट जाळ्यांचा वापर करा",

    recommendViral1: "संक्रमित झाडे काढून टाका आणि पसरण रोखा",
    recommendViral2: "योग्य कीटकनाशकांनी कीटक वाहकांवर नियंत्रण ठेवा",
    recommendViral3: "साधने आणि उपकरणे स्वच्छ करा",
    recommendViral4: "भविष्यातील बियाणे बटाट्यांसाठी विषाणूरहित बियाणे वापरा",

    recommendBacterial1: "संक्रमित झाडे काढून टाका आणि नष्ट करा",
    recommendBacterial2: "कॉपर-आधारित बॅक्टेरिसाईड वापरा",
    recommendBacterial3: "झाडे ओलावा असताना त्यांच्याशी काम करू नका",
    recommendBacterial4: "भविष्यातील पिकांमध्ये पिकांची फेरपालट करा",

    recommendDefault1: "कृषी तज्ञाशी संपर्क साधा",
    recommendDefault2: "वेगवेगळ्या कोनांतून अनेक फोटो घ्या",
    recommendDefault3: "झाडांमधील कोणत्याही लक्षणांमध्ये बदलांवर लक्ष ठेवा",
    recommendDefault4: "तपशीलवार विश्लेषणासाठी नमुने प्रयोगशाळेत पाठवा",

    listenRecommendations: "सूचनांना ऐका",
  },
  Gujarati: {
    takePhoto: "ફોટો લો",
    upload: "અપલોડ કરો",
    myPlants: "મારા છોડ",
    guide: "માર્ગદર્શિકા",
    recentActivity: "તાજેતરની પ્રવૃત્તિ",
    healthyPotato: "સ્વસ્થ બટાટા છોડ",
    earlyBlight: "અર્લી બ્લાઇટ મળ્યું",
    watchedGuide: "ઉપચાર માર્ગદર્શિકા જોઈ",
    scanPlant: "તમારા છોડને સ્કેન કરો",
    photoInstructions: "બટાકાના પાંદડાનો સ્પષ્ટ ફોટો લો",
    focusInstructions: "ખાતરી કરો કે પાંદડું સારી રીતે પ્રકાશિત અને ફોકસમાં છે",
    uploadFromGallery: "ગેલેરીમાંથી અપલોડ કરો",
    plantHealthResults: "છોડના સ્વાસ્થ્યના પરિણામો",
    moderateSeverity: "મધ્યમ ગંભીરતા",
    noPlantsYet: "હજુ સુધી કોઈ છોડ નથી. સ્કેન કરીને શરૂ કરો!",
    scanToAddPlants: "છોડ ઉમેરવા માટે સ્કેન કરો",
    recommendedActions: "ભલામણ કરેલ ક્રિયાઓ:",
    removeLeaves: "અસરગ્રસ્ત પાંદડાઓને દૂર કરો અને નષ્ટ કરો",
    applyFungicide: "કોપર આધારિત ફૂગનાશક લગાવો",
    improveCirculation: "છોડની આસપાસ હવાની અવરજવર સુધારો",
    listenRecommendations: "ભલામણો સાંભળો",
    pleaseWait: "કૃપા કરીને રાહ જુઓ...",
    watchVideo: "સારવાર વિડિઓ જુઓ",
    startCamera: "કેમેરા શરૂ કરો",
    reset: "રીસેટ કરો",
    scanAnotherPlant: "બીજી છોડ સ્કેન કરો",
    retryCamera: "કેમેરા ફરીથી પ્રયાસ કરો",
    selectImage: "છબી પસંદ કરો",
    focusInstructions: "પાંદડું સારું પ્રકાશિત અને ફોકસમાં છે તે ખાતરી કરો",
    analyze: "વિશ્લેષણ કરો",

    saveToPlants: "મારા છોડમાં સાચવો",
    learnImprove: "શીખો અને સુધારો",
    watchVideos: "સારી ખેતી તકનીકો શીખવા માટે વિડિઓ જુઓ",
    treatingBlight: "બટાકાના છોડમાં અર્લી બ્લાઇટની સારવાર કરવી",
    viewAllVideos: "બધા વિડિઓ જુઓ",
    trackMonitor: "તમારા પાકને ટ્રેક અને મોનિટર કરો",
    potatoField: "બટાકાનું ખેતર",
    daysAgo: "દિવસ પહેલા",
    viewTreatment: "સારવાર યોજના જુઓ",
    addNewPlant: "નવો છોડ ઉમેરો",
    selectLanguage: "ભાષા પસંદ કરો",
    home: "હોમ",
    scan: "સ્કેન",
    learn: "શીખો",
    unknownCondition: "અજ્ઞાત સ્થિતિ",
    detected: "મળ્યું",
    noRecentActivity:
      "હજી સુધી કોઈ તાજેતરની પ્રવૃત્તિ નથી. છોડને સ્કેન કરીને શરૂ કરો!",
    guide: "માર્ગદર્શિકા",
    recommendHealthy1: "नियमित पाण्याची व्यवस्था चालू ठेवा",
    recommendHealthy2: "गरज पडल्यास संतुलित खत वापरा",
    recommendHealthy3: "झाडाच्या आरोग्यातील कोणत्याही बदलांवर लक्ष ठेवा",
    recommendHealthy4: "साठवणीच्या जागेत योग्य वायुवीजन सुनिश्चित करा",

    recommendEarlyBlight1: "प्रभावित झालेली पाने काढून टाका आणि नष्ट करा",
    recommendEarlyBlight2: "कॉपर-आधारित फंगीसाईड वापरा",
    recommendEarlyBlight3: "झाडाभोवती हवेचा प्रवाह सुधारा",
    recommendEarlyBlight4: "पानांची ओलावा टाळण्यासाठी वरून पाण्याचा फवारा टाळा",

    recommendLateBlight1:
      "सर्व संक्रमित झाडांची सामग्री त्वरित काढून टाका आणि नष्ट करा",
    recommendLateBlight2:
      "लेट ब्लाइटसाठी विशिष्ट सक्रिय घटकांसह फंगीसाईड वापरा",
    recommendLateBlight3:
      "चांगला हवेचा प्रवाह मिळावा म्हणून झाडांमधील अंतर वाढवा",
    recommendLateBlight4:
      "संक्रमण टाळण्यासाठी कोरड्या हवामानात बटाट्यांची काढणी करा",

    recommendBlackScurf1: "रोगमुक्त बियाणे बटाट्यांचा वापर करा",
    recommendBlackScurf2: "3-4 वर्षांच्या अंतराने पिकांची फेरपालट करा",
    recommendBlackScurf3: "थंड आणि ओल्या परिस्थितीत काढणी करू नका",
    recommendBlackScurf4: "बटाट्यांची साठवण 7-10°C तापमान आणि आर्द्रतेसह करा",

    recommendCommonScab1: "जेथे शक्य असेल तेथे जमिनीचा pH 5.5 पेक्षा कमी ठेवा",
    recommendCommonScab2:
      "बटाट्यांच्या निर्मितीच्या काळात जमिनीत स्थिर ओलावा राखा",
    recommendCommonScab3: "भविष्यातील लागवडीसाठी प्रतिकारक्षम जाती वापरा",
    recommendCommonScab4: "जमिनीची रचना सुधारण्यासाठी जैविक पदार्थ वापरा",

    recommendFungal1: "योग्य फंगीसाईड उपचार वापरा",
    recommendFungal2: "झाडाभोवती आणि साठवणीतील आर्द्रता कमी करा",
    recommendFungal3: "वरून पाण्याचा फवारा टाळा",
    recommendFungal4: "काढणीनंतर झाडांची अवशेषे काढून टाका",

    recommendInsect1: "योग्य जैविक किंवा रासायनिक कीटकनाशक वापरा",
    recommendInsect2:
      "लागू असलेल्या परिस्थितीत फायदेशीर कीटकांना प्रोत्साहन द्या",
    recommendInsect3: "जोरात नुकसान झालेल्या झाडांच्या भागांना काढून टाका",
    recommendInsect4:
      "कीटक लोकसंख्या नियंत्रित करण्यासाठी चिकट जाळ्यांचा वापर करा",

    recommendViral1: "संक्रमित झाडे काढून टाका आणि पसरण रोखा",
    recommendViral2: "योग्य कीटकनाशकांनी कीटक वाहकांवर नियंत्रण ठेवा",
    recommendViral3: "साधने आणि उपकरणे स्वच्छ करा",
    recommendViral4: "भविष्यातील बियाणे बटाट्यांसाठी विषाणूरहित बियाणे वापरा",

    recommendBacterial1: "संक्रमित झाडे काढून टाका आणि नष्ट करा",
    recommendBacterial2: "कॉपर-आधारित बॅक्टेरिसाईड वापरा",
    recommendBacterial3: "झाडे ओलावा असताना त्यांच्याशी काम करू नका",
    recommendBacterial4: "भविष्यातील पिकांमध्ये पिकांची फेरपालट करा",

    recommendDefault1: "कृषी तज्ञाशी संपर्क साधा",
    recommendDefault2: "वेगवेगळ्या कोनांतून अनेक फोटो घ्या",
    recommendDefault3: "झाडांमधील कोणत्याही लक्षणांमध्ये बदलांवर लक्ष ठेवा",
    recommendDefault4: "तपशीलवार विश्लेषणासाठी नमुने प्रयोगशाळेत पाठवा",

    listenRecommendations: "सूचनांना ऐका",
  },
  Punjabi: {
    takePhoto: "ਫੋਟੋ ਲਓ",
    upload: "ਅਪਲੋਡ ਕਰੋ",
    myPlants: "ਮੇਰੇ ਪੌਦੇ",
    guide: "ਗਾਈਡ",
    recentActivity: "ਹਾਲੀਆ ਗਤੀਵਿਧੀ",
    healthyPotato: "ਸਿਹਤਮੰਦ ਆਲੂ ਦਾ ਪੌਦਾ",
    earlyBlight: "ਅਰਲੀ ਬਲਾਇਟ ਦਾ ਪਤਾ ਲੱਗਿਆ",
    watchedGuide: "ਇਲਾਜ ਗਾਈਡ ਦੇਖੀ",
    scanPlant: "ਆਪਣੇ ਪੌਦੇ ਨੂੰ ਸਕੈਨ ਕਰੋ",
    photoInstructions: "ਆਪਣੇ ਆਲੂ ਦੇ ਪੱਤੇ ਦੀ ਸਾਫ਼ ਫੋਟੋ ਲਓ",
    focusInstructions: "ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਪੱਤਾ ਚੰਗੀ ਤਰ੍ਹਾਂ ਰੌਸ਼ਨ ਅਤੇ ਫੋਕਸ ਵਿੱਚ ਹੈ",
    uploadFromGallery: "ਗੈਲਰੀ ਤੋਂ ਅਪਲੋਡ ਕਰੋ",
    plantHealthResults: "ਪੌਦੇ ਦੀ ਸਿਹਤ ਦੇ ਨਤੀਜੇ",
    moderateSeverity: "ਮੱਧਮ ਗੰਭੀਰਤਾ",
    recommendedActions: "ਸਿਫਾਰਸ਼ੀ ਕਾਰਵਾਈਆਂ",
    removeLeaves: "ਪ੍ਰਭਾਵਿਤ ਪੱਤਿਆਂ ਨੂੰ ਹਟਾਓ ਅਤੇ ਨਸ਼ਟ ਕਰੋ",
    applyFungicide: "ਤਾਂਬੇ-ਆਧਾਰਿਤ ਫੰਗੀਸਾਈਡ ਲਗਾਓ",
    improveCirculation: "ਪੌਦਿਆਂ ਦੇ ਆਲੇ ਦੁਆਲੇ ਹਵਾ ਦੇ ਸੰਚਾਰ ਨੂੰ ਵਧਾਓ",
    listenRecommendations: "ਸਿਫਾਰਸ਼ਾਂ ਸੁਣੋ",
    watchVideo: "ਇਲਾਜ ਵੀਡੀਓ ਦੇਖੋ",
    saveToPlants: "ਮੇਰੇ ਪੌਦਿਆਂ ਵਿੱਚ ਸੇਵ ਕਰੋ",
    learnImprove: "ਸਿੱਖੋ ਅਤੇ ਸੁਧਾਰੋ",
    watchVideos: "ਬਿਹਤਰ ਖੇਤੀ ਤਕਨੀਕਾਂ ਸਿੱਖਣ ਲਈ ਵੀਡੀਓ ਦੇਖੋ",
    treatingBlight: "ਆਲੂ ਦੇ ਪੌਦਿਆਂ ਵਿੱਚ ਅਰਲੀ ਬਲਾਇਟ ਦਾ ਇਲਾਜ",
    viewAllVideos: "ਸਾਰੇ ਵੀਡੀਓ ਦੇਖੋ",
    trackMonitor: "ਆਪਣੀ ਫਸਲ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ",
    potatoField: "ਆਲੂ ਦਾ ਖੇਤ",
    daysAgo: "ਦਿਨ ਪਹਿਲਾਂ",
    viewTreatment: "ਇਲਾਜ ਯੋਜਨਾ ਦੇਖੋ",
    addNewPlant: "ਨਵਾਂ ਪੌਦਾ ਸ਼ਾਮਲ ਕਰੋ",
    selectLanguage: "ਭਾਸ਼ਾ ਚੁਣੋ",
    home: "ਹੋਮ",
    scan: "ਸਕੈਨ",
    learn: "ਸਿੱਖੋ",
    unknownCondition: "ਅਣਜਾਣ ਸਥਿਤੀ",
    detected: "ਦਾ ਪਤਾ ਲਗਾਇਆ",
    noRecentActivity:
      "ਹਾਲੇ ਤੱਕ ਕੋਈ ਹਾਲੀਆ ਗਤੀਵਿਧੀ ਨਹੀਂ। ਪੌਦਾ ਸਕੈਨ ਕਰਕੇ ਸ਼ੁਰੂ ਕਰੋ!",
    camera: "ਕੈਮਰਾ",
    error: "ਗਲਤੀ",
    selectImage: "ਚਿੱਤਰ ਚੁਣੋ",
    activatingCamera: "ਕੈਮਰਾ ਚਾਲੂ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    retryCamera: "ਕੈਮਰਾ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ",
    startCamera: "ਕੈਮਰਾ ਸ਼ੁਰੂ ਕਰੋ",
    reset: "ਰੀਸੈੱਟ ਕਰੋ",
    analyze: "ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ",
    analyzingImage: "ਚਿੱਤਰ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ...",
    pleaseWait: "ਕਿਰਪਾ ਕਰਕੇ ਉਡੀਕ ਕਰੋ",
    loadingResults: "ਨਤੀਜੇ ਲੋਡ ਹੋ ਰਹੇ ਹਨ",
    pleaseWaitResults: "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਨਤੀਜੇ ਲੋਡ ਹੋਣ ਤੱਕ ਉਡੀਕ ਕਰੋ...",
    backToScan: "ਸਕੈਨ 'ਤੇ ਵਾਪਸ ਜਾਓ",
    plantSaved: "ਪੌਦਾ ਸੇਵ ਕੀਤਾ",
    scanAnotherPlant: "ਇੱਕ ਹੋਰ ਪੌਦਾ ਸਕੈਨ ਕਰੋ",
    sunny: "ਧੁੱਪ ਵਾਲਾ",
    watered: "ਪਾਣੀ ਦਿੱਤਾ",
    needsWater: "ਪਾਣੀ ਦੀ ਲੋੜ ਹੈ",
    medium: "ਮੱਧਮ",
    noPlantsYet: "ਹਾਲੇ ਤੱਕ ਕੋਈ ਪੌਦੇ ਨਹੀਂ ਜੋੜੇ ਗਏ",
    scanToAddPlants: "ਪੌਦੇ ਜੋੜਨ ਲਈ ਸਕੈਨ ਕਰੋ ਜਾਂ ਫੋਟੋ ਅਪਲੋਡ ਕਰੋ",
    properWatering: "ਸਹੀ ਪਾਣੀ ਲਗਾਉਣ ਦੀਆਂ ਤਕਨੀਕਾਂ",
    organicPestControl: "ਜੈਵਿਕ ਕੀਟ ਨਿਯੰਤਰਣ",
    soilHealthTips: "ਮਿੱਟੀ ਦੀ ਸਿਹਤ ਲਈ ਸੁਝਾਅ",
    harvestingGuide: "ਵਾਢੀ ਗਾਈਡ",
    doctorTitle: "ਡਾ. ਸ਼ਰਮਾ, ਪੌਦਾ ਰੋਗ ਵਿਗਿਆਨੀ",
    cameraTrouble:
      "ਕੈਮਰੇ ਨਾਲ ਸਮੱਸਿਆ ਆ ਰਹੀ ਹੈ? ਇਸ ਦੀ ਬਜਾਏ ਅਪਲੋਡ ਟੈਬ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
    uploadImage: "ਚਿੱਤਰ ਅਪਲੋਡ ਕਰੋ",
    selectImage: "ਚਿੱਤਰ ਚੁਣੋ",
    confirmLanguage: "ਭਾਸ਼ਾ ਬਦਲਣ ਲਈ ਪੁਸ਼ਟੀ ਕਰੋ",
    confirm: "ਪੁਸ਼ਟੀ",
    cancel: "ਰੱਦ ਕਰੋ",
    recommendHealthy1: "ਨਿਯਮਿਤ ਪਾਣੀ ਦੇਣ ਦਾ ਸਮਾਂ ਜਾਰੀ ਰੱਖੋ",
    recommendHealthy2: "ਜ਼ਰੂਰਤ ਪੈਣ 'ਤੇ ਸੰਤੁਲਿਤ ਖਾਦ ਵਰਤੋ",
    recommendHealthy3: "ਪੌਦੇ ਦੀ ਸਿਹਤ 'ਚ ਕਿਸੇ ਵੀ ਤਬਦੀਲੀ 'ਤੇ ਧਿਆਨ ਦਿਓ",
    recommendHealthy4: "ਭੰਡਾਰਨ ਵਾਲੀਆਂ ਥਾਵਾਂ 'ਤੇ ਠੀਕ ਹਵਾਦਾਨ ਯਕੀਨੀ ਬਣਾਓ",
        
    recommendEarlyBlight1: "ਪ੍ਰਭਾਵਿਤ ਪੱਤੇ ਕੱਢ ਕੇ ਨਸ਼ਟ ਕਰੋ",
    recommendEarlyBlight2: "ਤਾਂਬੇ-ਆਧਾਰਿਤ ਫੰਗਸਨਾਸ਼ਕ ਵਰਤੋ",
    recommendEarlyBlight3: "ਪੌਦੇ ਦੇ ਆਸ-ਪਾਸ ਹਵਾ ਦਾ ਪ੍ਰਵਾਹ ਸੁਧਾਰੋ",
    recommendEarlyBlight4: "ਪੱਤਿਆਂ ਦੀ ਭਿੱਜ ਤੋਂ ਬਚਾਉਣ ਲਈ ਉੱਪਰੋਂ ਪਾਣੀ ਨਾ ਛਿੜਕੋ",
        
    recommendLateBlight1: "ਸਾਰੀ ਸੰਕਰਮਿਤ ਪੌਦੇ ਦੀ ਸਮੱਗਰੀ ਤੁਰੰਤ ਕੱਢ ਕੇ ਨਸ਼ਟ ਕਰੋ",
    recommendLateBlight2: "ਲੇਟ ਬਲਾਈਟ ਲਈ ਖ਼ਾਸ ਸਰਗਰਮ ਘਟਕਾਂ ਵਾਲਾ ਫੰਗਸਨਾਸ਼ਕ ਵਰਤੋ",
    recommendLateBlight3: "ਚੰਗੀ ਹਵਾ ਦਾ ਪ੍ਰਵਾਹ ਲਈ ਪੌਦਿਆਂ ਵਿਚਕਾਰ ਦੂਰੀ ਵਧਾਓ",
    recommendLateBlight4: "ਸੰਕਰਮਣ ਤੋਂ ਬਚਣ ਲਈ ਸੁੱਕੇ ਮੌਸਮ 'ਚ ਆਲੂ ਦੀ ਕਟਾਈ ਕਰੋ",
        
    recommendBlackScurf1: "ਰੋਗ-ਮੁਕਤ ਬੀਜ ਆਲੂ ਵਰਤੋ",
    recommendBlackScurf2: "3-4 ਸਾਲਾਂ ਦੇ ਅੰਤਰ 'ਤੇ ਫ਼ਸਲ ਦੀ ਫੇਰ-ਬਦਲ ਕਰੋ",
    recommendBlackScurf3: "ਠੰਡੇ ਅਤੇ ਭਿੱਜੇ ਮੌਸਮ 'ਚ ਕਟਾਈ ਨਾ ਕਰੋ",
    recommendBlackScurf4: "ਆਲੂਆਂ ਨੂੰ 7-10°C ਤਾਪਮਾਨ ਅਤੇ ਨਮੀ ਨਾਲ ਭੰਡਾਰ ਕਰੋ",
        
    recommendCommonScab1: "ਜਿੱਥੇ ਸੰਭਵ ਹੋਵੇ ਉੱਥੇ ਮਿੱਟੀ ਦਾ pH 5.5 ਤੋਂ ਘੱਟ ਰੱਖੋ",
    recommendCommonScab2: "ਆਲੂ ਦੇ ਨਿਰਮਾਣ ਦੌਰਾਨ ਮਿੱਟੀ 'ਚ ਸਥਿਰ ਨਮੀ ਬਣਾਈ ਰੱਖੋ",
    recommendCommonScab3: "ਭਵਿਖ ਵਿੱਚ ਪ੍ਰਤੀਰੋਧਕ ਕਿਸਮਾਂ ਵਰਤੋ",
    recommendCommonScab4: "ਮਿੱਟੀ ਦੀ ਬਣਤਰ ਸੁਧਾਰਨ ਲਈ ਜੈਵਿਕ ਪਦਾਰਥ ਵਰਤੋ",
        
    recommendFungal1: "ਢੁਕਵਾਂ ਫੰਗਸਨਾਸ਼ਕ ਇਲਾਜ ਵਰਤੋ",
    recommendFungal2: "ਪੌਦੇ ਦੇ ਆਸ-ਪਾਸ ਅਤੇ ਭੰਡਾਰਨ 'ਚ ਨਮੀ ਘਟਾਓ",
    recommendFungal3: "ਉੱਪਰੋਂ ਪਾਣੀ ਨਾ ਛਿੜਕੋ",
    recommendFungal4: "ਕਟਾਈ ਤੋਂ ਬਾਅਦ ਪੌਦੇ ਦੇ ਅਵਸ਼ੇਸ਼ ਹਟਾ ਦਿਓ",
        
    recommendInsect1: "ਢੁਕਵਾਂ ਜੈਵਿਕ ਜਾਂ ਰਸਾਇਣਿਕ ਕੀਟਨਾਸ਼ਕ ਵਰਤੋ",
    recommendInsect2: "ਲਾਗੂ ਹੋਣ 'ਤੇ ਲਾਭਦਾਇਕ ਕੀਟਾਂ ਨੂੰ ਪ੍ਰੋਤਸਾਹਨ ਦਿਓ",
    recommendInsect3: "ਬੁਰੀ ਤਰ੍ਹਾਂ ਨੁਕਸਾਨ ਵਾਲੇ ਪੌਦੇ ਦੇ ਹਿੱਸੇ ਕੱਟ ਕੇ ਸਾਫ ਕਰੋ",
    recommendInsect4: "ਕੀਟ ਆਬਾਦੀ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਨ ਲਈ ਚਿਪਚਿਪੇ ਫਾਂਦੇ ਵਰਤੋ",
        
    recommendViral1: "ਸੰਕਰਮਿਤ ਪੌਦੇ ਕੱਢ ਕੇ ਨਸ਼ਟ ਕਰੋ ਅਤੇ ਫੈਲਣ ਨੂੰ ਰੋਕੋ",
    recommendViral2: "ਢੁਕਵੇਂ ਕੀਟਨਾਸ਼ਕਾਂ ਨਾਲ ਕੀਟ ਵਾਹਕਾਂ 'ਤੇ ਨਿਯੰਤਰਣ ਰੱਖੋ",
    recommendViral3: "ਸਾਧਨਾਂ ਅਤੇ ਉਪਕਰਣਾਂ ਨੂੰ ਸਾਫ ਕਰੋ",
    recommendViral4: "ਭਵਿੱਖ ਲਈ ਵਾਇਰਸ-ਮੁਕਤ ਬੀਜ ਆਲੂ ਵਰਤੋ",
        
    recommendBacterial1: "ਸੰਕਰਮਿਤ ਪੌਦੇ ਕੱਢ ਕੇ ਨਸ਼ਟ ਕਰੋ",
    recommendBacterial2: "ਤਾਂਬੇ-ਆਧਾਰਿਤ ਬੈਕਟੀਰੀਸਾਈਡ ਵਰਤੋ",
    recommendBacterial3: "ਪੌਦੇ ਗਿੱਲੇ ਹੋਣ 'ਤੇ ਉਨ੍ਹਾਂ ਨਾਲ ਕੰਮ ਨਾ ਕਰੋ",
    recommendBacterial4: "ਭਵਿੱਖ ਦੀਆਂ ਫ਼ਸਲਾਂ 'ਚ ਫ਼ਸਲ ਦੀ ਫੇਰ-ਬਦਲ ਕਰੋ",
        
    recommendDefault1: "ਖੇਤੀਬਾੜੀ ਮਾਹਿਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    recommendDefault2: "ਵੱਖ-ਵੱਖ ਕੋਣਾਂ ਤੋਂ ਕਈ ਫੋਟੋ ਲਓ",
    recommendDefault3: "ਪੌਦੇ 'ਚ ਕਿਸੇ ਵੀ ਲੱਛਣਾਂ 'ਚ ਤਬਦੀਲੀ 'ਤੇ ਧਿਆਨ ਦਿਓ",
    recommendDefault4: "ਵਿਸਤ੍ਰਿਤ ਵਿਸ਼ਲੇਸ਼ਣ ਲਈ ਨਮੂਨੇ ਪ੍ਰਯੋਗਸ਼ਾਲਾ ਭੇਜੋ",
        
    listenRecommendations: "ਸਲਾਹਾਂ ਨੂੰ ਸੁਣੋ"

  },
  // Add other languages as needed
};

// Create the context
const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("English");
  const [currentTranslations, setCurrentTranslations] = useState(
    translationsData.English
  );

  useEffect(() => {
    // Load language from localStorage on mount
    const savedLanguage = localStorage.getItem("selectedLanguage") || "English";
    setLanguage(savedLanguage);
  }, []);

  // Update translations when language changes
  useEffect(() => {
    setCurrentTranslations(
      translationsData[language] || translationsData.English
    );
    // Save language preference to localStorage
    localStorage.setItem("selectedLanguage", language);
  }, [language]);

  const t = (key) => currentTranslations[key] || key;

  // Value to be provided by the context
  const value = {
    language,
    setLanguage,
    t,
    translations: currentTranslations,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
