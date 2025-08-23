/**
 * Component Loader - Sistema per caricare dinamicamente componenti HTML
 */

class ComponentLoader {
    constructor() {
        this.loadedComponents = new Map();
        this.componentContainer = null;
    }

    /**
     * Inizializza il component loader
     */
    init() {
        this.componentContainer = document.querySelector('.main-container');
        if (!this.componentContainer) {
            console.error('Container principale non trovato');
            return false;
        }
        return true;
    }

    /**
     * Carica un componente HTML
     * @param {string} componentName - Nome del componente da caricare
     * @param {string} targetSelector - Selettore dove inserire il componente (opzionale)
     */
    async loadComponent(componentName, targetSelector = null) {
        try {
            // Controlla se il componente è già stato caricato
            if (this.loadedComponents.has(componentName)) {
                console.log(`Componente ${componentName} già caricato`);
                return this.loadedComponents.get(componentName);
            }

            const response = await fetch(`components/${componentName}.html`);
            
            if (!response.ok) {
                throw new Error(`Errore nel caricamento del componente: ${response.status}`);
            }

            const htmlContent = await response.text();
            
            // Salva il componente nella cache
            this.loadedComponents.set(componentName, htmlContent);
            
            // Se specificato un target, inserisce il contenuto
            if (targetSelector) {
                const targetElement = document.querySelector(targetSelector);
                if (targetElement) {
                    targetElement.innerHTML = htmlContent;
                } else {
                    console.warn(`Target selector ${targetSelector} non trovato`);
                }
            }

            console.log(`Componente ${componentName} caricato con successo`);
            return htmlContent;

        } catch (error) {
            console.error(`Errore nel caricamento del componente ${componentName}:`, error);
            return null;
        }
    }

    /**
     * Inserisce un componente già caricato in un contenitore
     * @param {string} componentName - Nome del componente
     * @param {string} targetSelector - Selettore del contenitore target
     */
    insertComponent(componentName, targetSelector) {
        const htmlContent = this.loadedComponents.get(componentName);
        if (!htmlContent) {
            console.error(`Componente ${componentName} non trovato nella cache`);
            return false;
        }

        const targetElement = document.querySelector(targetSelector);
        if (!targetElement) {
            console.error(`Target selector ${targetSelector} non trovato`);
            return false;
        }

        targetElement.innerHTML = htmlContent;
        return true;
    }

    /**
     * Precarica tutti i componenti essenziali
     */
    async preloadComponents() {
        const components = [
            'main-menu',
            'challenge-scasso',
            'challenge-standard',
            'challenge-timer', 
            'challenge-combat',
            'challenge-perfect',
            'challenge-accumulator',
            'challenge-sudden-death',
            'challenge-hit-or-miss',
            'challenge-double-bar',
            'player-name',
            'cutscene',
            'modal-system'
        ];

        console.log('Precaricamento componenti in corso...');
        
        const loadPromises = components.map(component => 
            this.loadComponent(component).catch(error => {
                console.warn(`Componente ${component} non disponibile:`, error);
                return null;
            })
        );

        await Promise.all(loadPromises);
        console.log('Precaricamento completato');
    }

    /**
     * Ottiene la lista dei componenti caricati
     */
    getLoadedComponents() {
        return Array.from(this.loadedComponents.keys());
    }

    /**
     * Rimuove un componente dalla cache
     * @param {string} componentName - Nome del componente da rimuovere
     */
    unloadComponent(componentName) {
        return this.loadedComponents.delete(componentName);
    }

    /**
     * Svuota la cache dei componenti
     */
    clearCache() {
        this.loadedComponents.clear();
    }

    /**
     * Inserisce tutti i componenti caricati nel container principale
     */
    async insertAllComponents() {
        if (!this.componentContainer) {
            console.error('Container principale non trovato');
            return false;
        }

        // Ordine di inserimento dei componenti
        const componentOrder = [
            'main-menu',
            'challenge-scasso',
            'challenge-standard',
            'challenge-timer', 
            'challenge-combat',
            'challenge-perfect',
            'challenge-accumulator',
            'challenge-sudden-death',
            'challenge-hit-or-miss',
            'challenge-double-bar',
            'player-name',
            'cutscene'
        ];

        // Inserisce i componenti delle sezioni principali
        for (const componentName of componentOrder) {
            const htmlContent = this.loadedComponents.get(componentName);
            if (htmlContent) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = htmlContent;
                this.componentContainer.appendChild(tempDiv.firstElementChild);
                console.log(`Componente ${componentName} inserito`);
            }
        }

        // Inserisce il sistema modale alla fine del body
        const modalHtml = this.loadedComponents.get('modal-system');
        if (modalHtml) {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = modalHtml;
            document.body.appendChild(tempDiv.firstElementChild);
            console.log('Sistema modale inserito');
        }

        return true;
    }
}

// Istanza globale del component loader
window.componentLoader = new ComponentLoader();

// Auto-inizializzazione quando il DOM è pronto
document.addEventListener('DOMContentLoaded', async () => {
    if (window.componentLoader.init()) {
        // Precarica i componenti essenziali
        await window.componentLoader.preloadComponents();
        // Inserisce tutti i componenti nel DOM
        await window.componentLoader.insertAllComponents();
        console.log('Component Loader inizializzato con successo');
    }
});