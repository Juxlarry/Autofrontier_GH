class CarDocumentsController < ApplicationController
  before_action :set_car_document, only: %i[ show edit update destroy ]

  # GET /car_documents or /car_documents.json
  def index
    @car_documents = CarDocument.all
  end

  # GET /car_documents/1 or /car_documents/1.json
  def show
  end

  # GET /car_documents/new
  def new
    @car_document = CarDocument.new
  end

  # GET /car_documents/1/edit
  def edit
  end

  # POST /car_documents or /car_documents.json
  def create
    @car_document = CarDocument.new(car_document_params)

    @all_docs = CarDocument.all

    @count = 0


    @doc_typed = (@car_document.doc_type).downcase
    logger.info "#{@doc_typed}"

    @all_docs.each do |doc|

      @index_doc = (doc.doc_type).downcase

      if @index_doc == @doc_typed

        @count += 1

      end 


      logger.info "#{@index_doc} --- make from loop"

    end 

    logger.info "Count details -- #{ @count}"
    logger.info "Car doc details -- #{ @car_document.inspect}"


    respond_to do |format|
      if @count < 1
        @car_document.save
        format.html { redirect_to car_documents_path, notice: "Car document was successfully created." }
        format.json { render :show, status: :created, location: @car_document }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @car_document.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /car_documents/1 or /car_documents/1.json
  def update
    respond_to do |format|
      if @car_document.update(car_document_params)
        format.html { redirect_to @car_document, notice: "Car document was successfully updated." }
        format.json { render :show, status: :ok, location: @car_document }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @car_document.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /car_documents/1 or /car_documents/1.json
  def destroy
    @car_document.destroy
    respond_to do |format|
      format.html { redirect_to car_documents_url, notice: "Car document was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_car_document
      @car_document = CarDocument.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def car_document_params
      params.require(:car_document).permit(:doc_type, :doc_valid)
    end
end
