<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\MediaObjectRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use App\Controller\MediaObjectController;
use Symfony\Component\HttpFoundation\File\File;

/**
 * @ORM\Entity(repositoryClass=MediaObjectRepository::class)
 * @Vich\Uploadable()
 * @ApiResource(
 *     normalizationContext={"groups"={"media_object:read"}},
 *     itemOperations={"get"},
 *     collectionOperations={
 *          "get",
 *          "post"={
 *              "controller"=MediaObjectController::class,
 *              "deserialize"=false,
 *              "validation_groups"={
 *                  "Default",
 *                  "media_object_create"
 *              },
 *              "openapi_context"={
 *                  "requestBody"={
 *                      "content"={
 *                          "multipart/form-data"={
 *                              "schema"={
 *                                  "type"="object",
 *                                  "properties"={
 *                                      "file"={
 *                                          "type"="string",
 *                                          "format"="binary"
 *                                      }
 *                                  }
 *                              }
 *                          }
 *                      }
 *                  }
 *              }
 *          }
 *     }
 * )
 */
class MediaObject
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     * @Groups({"media_object:read", "salon:read"})
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $filePath;

    /**
     * @var string|null
     * @Groups({"media_object:read", "salon:read"})
     */
    public ?string $contentUrl = null;

    /**
     * @var File|null
     * @Vich\UploadableField(mapping="salon_image", fileNameProperty="filePath")
     * @Assert\NotNull(groups="media_object_create")
     */
    public ?File $file;

    /**
     * @ORM\OneToMany(targetEntity=Salon::class, mappedBy="image")
     * @Groups({"media_object:read"})
     */
    private $salons;

    public function __construct()
    {
        $this->salons = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getFilePath(): ?string
    {
        return $this->filePath;
    }

    public function setFilePath(string $filePath): self
    {
        $this->filePath = $filePath;

        return $this;
    }

    /**
     * @return Collection|Salon[]
     */
    public function getSalons(): Collection
    {
        return $this->salons;
    }

    public function addSalon(Salon $salon): self
    {
        if (!$this->salons->contains($salon)) {
            $this->salons[] = $salon;
            $salon->setImage($this);
        }

        return $this;
    }

    public function removeSalon(Salon $salon): self
    {
        if ($this->salons->removeElement($salon)) {
            // set the owning side to null (unless already changed)
            if ($salon->getImage() === $this) {
                $salon->setImage(null);
            }
        }

        return $this;
    }

}
