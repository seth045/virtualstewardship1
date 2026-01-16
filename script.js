// Simple navigation helpers used across the app
function goTo(page) {
  window.location.href = page;
}

function goHome() {
  window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function () {
  // ========= ACCORDION BEHAVIOR (all pages) =========
  const headers = document.querySelectorAll(".accordion-header");

  headers.forEach((header) => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      if (!content) return;

      content.classList.toggle("open");

      const expanded = header.getAttribute("aria-expanded") === "true";
      header.setAttribute("aria-expanded", (!expanded).toString());
    });
  });

  // ========= BLOODSTREAM INFECTION CLUSTER PAGES =========
  const clusterId = document.body.dataset.bsiCluster;
  const markerButtons = document.querySelectorAll("[data-bsi-marker]");

  if (clusterId && markerButtons.length) {
    const markerLabelSpan = document.getElementById("bsi-marker-label");
    const recText = document.getElementById("bsi-recommended-text");
    const altText = document.getElementById("bsi-alternative-text");

    // Master regimen table – EDIT these strings to match your INTEGRIS pathway
    const BSI_DATA = {
      // --- Gram-negative bacilli ---
      ecoli_klebsiella_proteus: {
        negative: {
          rec:
            "Ceftriaxone 2 grams every 24 hours ",
          alt:
            "Piperacillin/Tazobactam 4.5 grams every 8 hours"
        },
        ctxm: {
          rec:
            "Ertapenem 1 gram every 24 hours OR Meropenem 1 gram every 8 hours",
          alt:
            "ID consult"
        },
        carbapenem_resistance: {
          rec:
            "ID consult",
          alt:
            "ID consult"
        }
      },

      enterobacter_citrobacter: {
        negative: {
          rec:
            "Cefepime 2 grams every 8 hours ",
          alt:
            "Ertapenem 1 gram every 24 hours OR Meropenem 1 gram every 8 hours"
        },
        ctxm: {
          rec:
            "Ertapenem 1 gram every 24 hours OR Meropenem 1 gram every 8 hours",
          alt:
            "ID consult"
        },
        carbapenem_resistance: {
          rec:
            "ID consult",
          alt:
            "ID consult"
        }
      },

      pseudomonas_aeruginosa: {
        negative: {
          rec:
            "Cefepime 2 grams every 8 hours OR Ceftazidime 2 grams every 8 hours",
          alt:
            "Piperacillin/Tazobactam 4.5 grams every 8 hours OR Meropenem 1 gram every 8 hours"
        }
      },

      // --- Gram-positive cocci ---
      staph_aureus: {
        negative: {
          rec:
            "Cefazolin 2 grams every 8 hours + ID consult",
          alt:
            "Nafcillin 12 grams/day + ID consult"
        },
        meca: {
          rec:
            "Vancomycin + ID consult",
          alt:
            "Daptomycin 8-10 mg/kg every 24 hours + ID consult"
        }
      },

      staph_lugdunensis: {
        na: {
          rec:
            "Cefazolin 2 grams every 8 hours + ID consult",
          alt:
            "Nafcillin 12 grams/day + ID consult"
        }
      },

      staph_epidermidis: {
        negative_or_meca: {
          rec:
            "1 to 2 sets of positve cultures without risk factors for bacteremia <br> No antibiotics",
          alt:
            "Both sites with positive cultures and/or risk factors for bacteremia <br> ID consult"
        }
      },

      strep_agalactiae_anginosus_pyogenes: {
        na: {
          rec:
            "Ceftriaxone 2 grams every 24 hours",
          alt:
            "Ampicillin 2 grams every 6 hours"
        }
      },


      strep_pneumoniae: {
        na: {
          rec:
            "Ceftriaxone 2 grams every 24 hours",
          alt:
            "Vancomycin"
        }
      },

      enterococcus_faecalis: {
        negative: {
          rec:
            "Ampicillin 2 grams every 6 hours",
          alt:
            "Vancomycin"
        },
        vana_or_vanb: {
          rec:
            "Ampicillin 2 grams every 6 hours",
          alt:
            "Daptomycin 8-10 mg/kg every 24 hours"
        }
      },

      enterococcus_faecium: {
        negative: {
          rec:
            "Vancomycin",
          alt:
            "Daptomycin 10-12 mg/kg every 24 hours"
        },
        vana_or_vanb: {
          rec:
            "Daptomycin 10-12 mg/kg every 24 hours",
          alt:
            "Linezolid 600 mg every 12 hours"
        }
      },

      listeria: {
        na: {
          rec:
            "Ampicillin 2 grams every 6 hours",
          alt:
            "Sulfamethoxazole/trimethoprim 20 mg/kg/day"
        }
      }, 

      bacillus: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      acinetobacter_calcoaceticus_baumannii_complex: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      enterobacteriaceae_morganellaceae: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      salmonella: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      serratia: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      haemophilus_influenzae: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      neisseria_meningitidis: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      stenotrophomonas_maltophilia: {
        na: {
          rec:
            "Information being updated ",
          alt:
            "Information being updated "
        }
      },

      candida_albicans: {
        na: {
          rec:
            "Information being updated ",
          alt:
            "Information being updated "
        }
      },

      candida_auris: {
        na: {
          rec:
            "Information being updated ",
          alt:
            "Information being updated"
        }
      },

      candida_dubliniensis: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      candida_famata: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      candida_glabrata: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      candida_guilliermondii: {
        na: {
          rec:
            "Information being updated ",
          alt:
            "Information being updated"
        }
      },

      candida_kefyr: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      candida_krusei: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      candida_lipytica: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      candida_lusitaniae: {
        na: {
          rec:
            "Information being updated ",
          alt:
            "Information being updated"
        }
      },

      candida_parapsilosis: {
        na: {
          rec:
            "Information being updated ",
          alt:
            "Information being updated"
        }
      },

      candida_tropicalis: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      cryptococcus_neoformans: {
        na: {
          rec:
            "Information being updated",
          alt:
            "Information being updated"
        }
      },

      cryptococcus_gattii: {
        na: {
          rec:
            "Information being updated ",
          alt:
            "Information being updated"
        }
      },

    };

    const clusterData = BSI_DATA[clusterId] || {};

    // Set up click handlers for each resistance marker button
    markerButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.dataset.bsiMarker;
        const data = clusterData[key];

        // Highlight active button
        markerButtons.forEach((b) =>
          b.classList.remove("active-resistance")
        );
        btn.classList.add("active-resistance");

        // Update marker label text
        markerLabelSpan.textContent = btn.textContent.trim();

        if (data) {
          recText.textContent = data.rec;
          altText.textContent = data.alt;
        } else {
          recText.textContent =
            "No regimen configured yet for this resistance marker. Refer to local guidelines.";
          altText.textContent = "—";
        }

        // Optional: close accordions so user can re-open if they want
        document
          .querySelectorAll(".accordion-content")
          .forEach((panel) => panel.classList.remove("open"));
        document
          .querySelectorAll(".accordion-header[aria-expanded]")
          .forEach((h) => h.setAttribute("aria-expanded", "false"));
      });
    });

    // Auto-apply the default active marker on load (usually 'Negative' or 'N/A')
    const initial = document.querySelector(".resistance-button.active-resistance");
    if (initial) {
      initial.click();
    }
  }
});

  
  