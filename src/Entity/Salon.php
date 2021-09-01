<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\SalonRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Controller\SalonController;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\HttpFoundation\File\File;

/**
 * @ApiResource(
 *     forceEager=false,
 *     normalizationContext={"groups"={"salon:read", "reservation:read", "enable_max_depth"=true}},
 *     denormalizationContext={"groups"={"salon:write"}}
 * )
 * @ORM\Entity(repositoryClass=SalonRepository::class)
 */
class Salon
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups("salon:read")
     */
    private $id;

    /**
     * @Assert\NotBlank(message="Ce champ ne peut pas être vide")
     * @ORM\Column(type="string", length=255)
     * @Groups({"salon:read", "salon:write"})
     */
    private ?string $nomSalon;

    /**
     * @ORM\Column(type="text")
     * @Groups({"salon:read", "salon:write"})
     */
    private ?string $descriptionSalon;


    /**
     * @ORM\Column(type="float")
     * @Groups({"salon:read", "salon:write"})
     */
    private ?float $prix;



    /**
     * @ORM\Column(type="integer")
     * @Groups({"salon:read", "salon:write"})
     */
    private ?int $nombrePlaces;

    /**
     * @ORM\ManyToOne(targetEntity=MediaObject::class, inversedBy="salons")
     * @Groups({"salon:read", "salon:write"})
     */
    private ?MediaObject $image;

    /**
     * @ORM\OneToMany(targetEntity=Reservation::class, mappedBy="salon")
     *  @Groups({"salon:read"})
     */
    private $reservation;

    public function __construct()
    {
        $this->reservation = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNomSalon(): ?string
    {
        return $this->nomSalon;
    }

    public function setNomSalon(string $nomSalon): self
    {
        $this->nomSalon = $nomSalon;

        return $this;
    }

    public function getDescriptionSalon(): ?string
    {
        return $this->descriptionSalon;
    }

    public function setDescriptionSalon(string $descriptionSalon): self
    {
        $this->descriptionSalon = $descriptionSalon;

        return $this;
    }


    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): self
    {
        $this->prix = $prix;

        return $this;
    }

    public function getNombrePlaces(): ?int
    {
        return $this->nombrePlaces;
    }

    public function setNombrePlaces(int $nombrePlaces): self
    {
        $this->nombrePlaces = $nombrePlaces;

        return $this;
    }

    public function getImage(): ?MediaObject
    {
        return $this->image;
    }

    public function setImage(?MediaObject $image): self
    {
        $this->image = $image;

        return $this;
    }

    /**
     * @return Collection|Reservation[]
     */
    public function getReservation(): Collection
    {
        return $this->reservation;
    }

    public function addReservation(Reservation $reservation): self
    {
        if (!$this->reservation->contains($reservation)) {
            $this->reservation[] = $reservation;
            $reservation->setSalon($this);
        }

        return $this;
    }

    public function removeReservation(Reservation $reservation): self
    {
        if ($this->reservation->removeElement($reservation)) {
            // set the owning side to null (unless already changed)
            if ($reservation->getSalon() === $this) {
                $reservation->setSalon(null);
            }
        }

        return $this;
    }






}
