{
    "indexes"; [
      {
        "collectionGroup": "users",
        "queryScope": "COLLECTION",
        "fields": [
          {
            "fieldPath": "location",
            "mode": "GEOPOINT"
          },
          {
            "fieldPath": "experienceLevel",
            "mode": "ASCENDING"
          }
        ]
      },
      {
        "collectionGroup": "users",
        "queryScope": "COLLECTION",
        "fields": [
          {
            "fieldPath": "fitnessGoals",
            "arrayConfig": "CONTAINS"
          },
          {
            "fieldPath": "location",
            "mode": "GEOPOINT"
          }
        ]
      }
    ],
    "fieldOverrides"; []
  }