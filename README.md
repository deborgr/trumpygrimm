# trumpygrimm
making trump tweets less harmfull by injecting a bit of grimm fairytale powder
or use your own .txt file and twitter params

## Installation

  `npm install @deborger/trumpygrimm`

## Usage

rename 'config.js.example' to 'config.js' and add your twitter credentials

1. createClient()
2. createMarkov('fileurlstring', twittersearchparams.json);

    if no args provided:
    fileurlstring = 'grimm.txt'
    twittersearchparams = params: {
      q: 'Trump',
      lang: 'en',
      count: '500',
      result_type: 'mixed'
    }
    
3. getNewSentece();
