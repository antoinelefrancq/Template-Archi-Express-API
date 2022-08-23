const errorController = {

    /**
     * Gère les erreurs de type 400 = Bad Reaquest
     *
     * @param {array} errors Mes erreurs dans le POST
     * @param {Request} req La requête HTPP
     * @param {Response} res La réponse HTTP
     */
    _400: (errors, req, res) => {
      res.status(400).json({
        type: 'Bad request',
        errors,
      });
    },
  
    /**
     * Gère les erreurs de type 404 = Not Found
     *
     * @param {Request} req La requête HTPP
     * @param {Response} res La réponse HTTP
     */
    _404: (req, res) => {
      res.status(404).json({
        error: 'Ressource not found. Please check the URL or verify the provided id.',
      });
    },
  
   /**
    * Gère les erreurs de type 500 = Internal Server Error
    *
    * @param {Error} error L'erreur capturée par le catch
    * @param {Request} req La requête HTPP
    * @param {Response} res La réponse HTTP
    */
    _500: (error, req, res) => {
      // on utilise console.trace, histoire de savoir d'ou vient l'erreur
      // (fichier et numéro de ligne - très pratique !)
      console.trace(error);
      res.status(500).json(error.toString());
    },
  };
  
  module.exports = errorController;